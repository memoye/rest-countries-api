import { getCountries } from "@/lib/api";
import { deserializeQueryParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type UseCountriesProps = {
  endpoint: `/${string}`;
  queryParams?: Record<string, string | number | boolean>;
};

function useCountries({ endpoint, queryParams }: UseCountriesProps) {
  const deserializedParams = deserializeQueryParams(queryParams);

  const helpers = useQuery({
    queryKey: [endpoint],
    queryFn: ({ queryKey }) =>
      getCountries(
        `${queryKey[0]}${deserializedParams ? "?" + deserializedParams : ""}`
      ),
    staleTime: Infinity,
  });

  return { ...helpers };
}
export default useCountries;
