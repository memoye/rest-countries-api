import { CountryCardProps } from "@/components/CountryCard";
import { getCountries } from "@/lib/api";
import { deserializeQueryParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type UseCountriesProps = {
  endpoint: `/${string}`;
  queryParams?: Record<string, string | number | boolean>;
};

function useCountries({ endpoint, queryParams }: UseCountriesProps) {
  const deserializedParams = deserializeQueryParams(queryParams);

  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const search = searchParams.get("search");

  const helpers = useQuery({
    queryKey: [endpoint],
    queryFn: ({ queryKey }) =>
      getCountries(
        `${queryKey[0]}${deserializedParams ? "?" + deserializedParams : ""}`
      ),
    staleTime: Infinity,
  });

  const [filteredData, setFilteredData] = useState<
    CountryCardProps[] | undefined
  >(helpers.data);

  useEffect(() => {
    setFilteredData(helpers.data);

    if (filter) {
      setFilteredData(
        helpers.data?.filter((country: CountryCardProps) => {
          if (search) {
            return (
              country.name.common
                .toLowerCase()
                .includes(search.toLowerCase()) &&
              (country.continents as string[]).includes(filter)
            );
          } else {
            return (country.continents as string[]).includes(filter);
          }
        })
      );
    } else {
      setFilteredData(
        helpers.data?.filter((country: CountryCardProps) =>
          search
            ? country.name.common
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              country.name.official.toLowerCase().includes(search.toLowerCase())
            : true
        )
      );
    }
  }, [filter, search, helpers.data]);

  return { ...helpers, filteredData, filter, search };
}
export default useCountries;
