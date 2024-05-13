import CountryCard from "@/components/CountryCard";
import FilterDropdown from "@/components/FilterDropdown";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/ui/Button";
import { CountryCardsSkeleton } from "@/components/ui/Skeletons";
import useCountries from "@/hooks/useCountries";
import { Link } from "react-router-dom";

const CARD_FIELDS = [
  "cca2",
  "capital",
  "name",
  "flags",
  "population",
  "region",
  "continents",
];

function Home() {
  const {
    isLoading,
    filteredData: countries,
    isError,
    error,
    search,
    filter,
    refetch,
  } = useCountries({
    endpoint: "/all",
    queryParams: {
      fields: CARD_FIELDS.join(),
    },
  });

  return (
    <div className="text-sm">
      <div className="flex flex-wrap items-center justify-between">
        <SearchInput />
        <FilterDropdown />
      </div>

      <div
        className={`${
          (countries && countries?.length > 0) || isLoading ? "grid" : ""
        } my-12 grid-cols-[repeat(auto-fill,_minmax(240px,1fr))] content-center gap-8 lg:gap-12`}
      >
        {isLoading ? (
          <CountryCardsSkeleton />
        ) : isError ? (
          <ErrorComponent
            message={error.message}
            recoverFn={() => refetch({ throwOnError: true })}
          />
        ) : countries && countries?.length > 0 ? (
          countries?.map((country: any) => (
            <CountryCard
              continents={country.continents}
              key={country.cca2}
              capital={country.capital}
              flags={country.flags}
              name={country.name}
              population={country.population}
              region={country.region}
            />
          ))
        ) : (
          <ErrorComponent
            title="No results found!"
            showBtn={false}
            message={
              search
                ? `Could not find country - "${search}"${
                    filter ? ' in "' + filter + '"' : ""
                  }" `
                : ""
            }
          />
        )}
      </div>
    </div>
  );
}
export default Home;

export function ErrorComponent({
  message,
  recoverFn,
  title,
  showBtn = true,
}: {
  recoverFn?: () => any;
  message?: string;
  title?: string;
  showBtn?: boolean;
}) {
  return (
    <div className="my-14 grid place-items-center gap-2 ">
      <img
        className="mb-6 max-w-32"
        src="/undraw_warning_re_eoyh.svg"
        alt="Error occured illustration"
      />
      <p className="text-lg font-semibold">
        {title || "Something went wrong."}
      </p>
      {message && (
        <p className="mb-4 font-mono font-normal tracking-wider text-light-text-input dark:text-dark-text-input">
          {message || "Unknown"}
        </p>
      )}
      {showBtn ? (
        recoverFn ? (
          <Button onClick={recoverFn}>Try again</Button>
        ) : (
          <Button asChild>
            <Link to={"/"}>Go Home</Link>
          </Button>
        )
      ) : null}
    </div>
  );
}
