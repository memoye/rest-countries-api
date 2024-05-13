import { getCountries } from "@/lib/api";
import { deserializeQueryParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

  const [filteredData, setFilteredData] = useState();

  return { ...helpers };
}
export default useCountries;
