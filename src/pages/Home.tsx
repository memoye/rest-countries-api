import CountryCard from "@/components/CountryCard";
import FilterDropdown from "@/components/FilterDropdown";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/ui/Button";
import { CountryCardsSkeleton } from "@/components/ui/Skeletons";
import useCountries from "@/hooks/useCountries";

const CARD_FIELDS = [
  "cca2",
  "capital",
  "name",
  "flags",
  "population",
  "region",
];

function Home() {
  const {
    isLoading,
    data: countries,
    isError,
    error,
    isFetching,
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

      <div className="my-12 grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] content-center justify-between gap-8 lg:gap-12">
        {isLoading ? (
          <CountryCardsSkeleton />
        ) : isError ? (
          <div className="my-14 grid place-items-center gap-2 ">
            <img
              className="mb-6 max-w-32"
              src="/undraw_warning_re_eoyh.svg"
              alt="Error occured illustration"
            />
            <p className="font-semibold">Something went wrong.</p>
            <Button onClick={() => refetch({ throwOnError: true })}>
              Try again
            </Button>
          </div>
        ) : (
          countries.map((country: any) => (
            <CountryCard
              key={country.cca2}
              capital={country.capital}
              flags={country.flags}
              name={country.name}
              population={country.population}
              region={country.region}
            />
          ))
        )}
      </div>
    </div>
  );
}
export default Home;
