import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

// lib
import { formatNumber } from "@/lib/utils";
import { Country } from "@/lib/definitions";
import { getCountries } from "@/lib/api";

// components
import {
  CountryDetailsSkeleton,
  DataItemSkeleton,
} from "@/components/ui/Skeletons";
import Button from "@/components/ui/Button";
import ErrorElement from "@/components/ErrorElement";

// hook
import useCountries from "@/hooks/useCountries";

type Details = Pick<
  Country,
  | "name"
  | "borders"
  | "cca2"
  | "flags"
  | "population"
  | "region"
  | "currencies"
  | "subregion"
  | "tld"
  | "languages"
  | "capital"
>;

const COUNTRY_DETAILS_FIELDS = [
  "name",
  "borders",
  "cca2",
  "flags",
  "population",
  "region",
  "currencies",
  "subregion",
  "tld",
  "languages",
  "capital",
];

function CountryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useCountries({
    endpoint: `/alpha/${id}`,
    queryParams: {
      fields: COUNTRY_DETAILS_FIELDS.join(),
    },
  });

  function handleBackButton() {
    navigate(-1);
  }

  const country = data as Details;

  if (isLoading) return <CountryDetailsSkeleton />;

  if (isError) {
    return <ErrorElement message={error.message || "Something went wrong."} />;
  }

  return (
    <div className="py-4 text-base">
      <Button onClick={handleBackButton} withIcon>
        <ArrowLongLeftIcon className="size-6" /> Back
      </Button>

      <section className="mt-12 flex w-full flex-col  items-center gap-12 lg:flex-row ">
        <figure className="mx-auto flex aspect-video w-full max-w-lg flex-1 place-items-center self-stretch overflow-hidden rounded lg:mx-0">
          <img
            className="h-full w-full bg-light-element dark:bg-dark-element"
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || country.name.common}
          />
        </figure>

        <div className="box-border px-8 max-sm:mx-auto lg:mx-0 lg:max-w-[50%]">
          <h2 className="my-6 text-2xl font-bold">{country.name.common}</h2>

          <dl className="flex flex-col flex-wrap items-start justify-between gap-2 md:flex-row lg:gap-4 ">
            <div className="space-y-3">
              <DataItem term="Native Name">
                {Object.keys(country.name.nativeName).map((key, i) => {
                  return (
                    <span key={key}>
                      {country.name.nativeName[key].common}
                      {Object.keys(country.name.nativeName)[i + 1] ? ", " : ""}
                    </span>
                  );
                })}
              </DataItem>
              <DataItem term="Population">
                {formatNumber(country.population)}
              </DataItem>
              <DataItem term="Region">{country.region}</DataItem>
              <DataItem term="Sub Region">{country.subregion}</DataItem>
              <DataItem term="Capital">{country.capital.join(", ")}</DataItem>
            </div>

            <div className="space-y-3">
              <DataItem term="Top Level Domain">{country.tld}</DataItem>
              <DataItem term="Currencies">
                {Object.keys(country.currencies).map((key, i) => {
                  return (
                    <span key={key}>
                      {country.currencies[key].name} - "
                      {country.currencies[key].symbol}"
                      {!Object.keys(country.currencies)[i + 1] ? ", " : ""}
                    </span>
                  );
                })}
              </DataItem>
              <DataItem term="Languages">
                {Object.keys(country.languages).map((key, i) => {
                  return (
                    <span key={key}>
                      {country.languages[key]}
                      {Object.keys(country.languages)[i + 1] ? ", " : ""}
                    </span>
                  );
                })}
              </DataItem>
            </div>

            <DataItem
              term="Border Countries"
              className="flex max-w-full items-center gap-2 max-sm:flex-wrap"
            >
              <CountryBorders borders={country.borders} />
            </DataItem>
          </dl>
        </div>
      </section>
    </div>
  );
}
export default CountryDetails;

function CountryBorders({ borders }: { borders: string[] }) {
  const results = useQueries({
    queries: borders.map((border) => {
      return {
        queryKey: [`/alpha/${border}`],
        queryFn: async () => getCountries(`/alpha/${border}?fields=name,cca2`),
      };
    }),
  });

  return results.map((result, i) => {
    const { isLoading, data, error, isError } = result;
    const borderData = data as Pick<Details, "name" | "cca2">;

    if (isLoading) return <DataItemSkeleton key={data} />;

    if (isError) {
      console.error("Boundary fetch error", error);
      return error.message;
    }

    return (
      <Button key={i} className="min-w-fit flex-1" asChild>
        <Link to={`/country/${borderData.cca2}`}>{borderData.name.common}</Link>
      </Button>
    );
  });
}

export function DataItem({
  term,
  className,
  children,
}: {
  term: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-wrap items-start space-x-1 ${
        className ? "mt-4 flex-col gap-2 lg:flex-row" : ""
      } ${term === "Border Countries" ? "lg:items-center" : ""}`}
    >
      <dt className="min-w-fit font-semibold">{term}: </dt>
      <dd className={`max-w-sm font-normal ${className}`}>{children}</dd>
    </div>
  );
}
