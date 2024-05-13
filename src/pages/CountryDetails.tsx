import Button from "@/components/ui/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

import data from "../../starter-files/data.json";
import { formatNumber } from "@/lib/utils";

const country = data.filter((place) => place.name.toLowerCase() == "canada")[0];

function CountryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleBackButton() {
    navigate(-1);
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
            src={country.flag}
            alt="flag"
          />
        </figure>

        <div className="box-border px-8 max-sm:mx-auto lg:mx-0 lg:max-w-[50%]">
          <h2 className="my-6 text-2xl font-bold">{country.name}</h2>

          <dl className="flex flex-col flex-wrap items-start justify-between gap-2 md:flex-row lg:gap-4 ">
            <div className="space-y-3">
              <DataItem term="Native Name">{country.nativeName}</DataItem>
              <DataItem term="Population">
                {formatNumber(country.population)}
              </DataItem>
              <DataItem term="Region">{country.region}</DataItem>
              <DataItem term="Sub Region">{country.subregion}</DataItem>
              <DataItem term="Capital">{country.capital}</DataItem>
            </div>

            <div className="space-y-3">
              <DataItem term="Top Level Domain">
                {country.topLevelDomain}
              </DataItem>
              <DataItem term="Currencies">
                {country.currencies?.map((currency, i) => (
                  <span key={currency.code}>
                    {currency.name}{" "}
                    {i < country.currencies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </DataItem>
              <DataItem term="Languages">
                {country.languages?.map((language, i) => (
                  <span key={language.iso639_2}>
                    {i < country.languages.length - 1
                      ? language.name
                      : ` and ${language.name}`}
                    {i < country.languages.length - 1 &&
                    country.languages.length > 2
                      ? ", "
                      : ""}
                  </span>
                ))}
              </DataItem>
            </div>

            <DataItem
              term="Border Countries"
              className="flex w-full items-center gap-2 max-sm:flex-wrap"
            >
              {["France", "Germany", "Netherlands"].map((country, i) => (
                <Button key={i} className="flex-1" asChild>
                  <Link to={`/`}>{country}</Link>
                </Button>
              ))}
            </DataItem>
          </dl>
        </div>
      </section>
    </div>
  );
}
export default CountryDetails;

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
      className={`flex flex-wrap items-start space-x-1  lg:items-center ${
        className ? "mt-4 flex-col gap-2 lg:flex-row" : ""
      }`}
    >
      <dt className="min-w-fit font-semibold">{term}: </dt>
      <dd className={`max-w-sm font-normal ${className}`}>{children}</dd>
    </div>
  );
}
