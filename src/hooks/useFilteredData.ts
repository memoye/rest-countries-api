import { CountryCardProps } from "@/components/CountryCard";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useFilteredData({ data }: { data: CountryCardProps[] | undefined }) {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const search = searchParams.get("search");

  const [filteredData, setFilteredData] = useState<typeof data>(data);

  const filterData = useCallback(() => {
    if (filter) {
      setFilteredData(
        data?.filter((country: CountryCardProps) => {
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
        data?.filter((country: CountryCardProps) =>
          search
            ? country.name.common
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              country.name.official.toLowerCase().includes(search.toLowerCase())
            : true
        )
      );
    }
  }, [filter, data, search]);

  useEffect(() => {
    setFilteredData(data);

    filterData();
  }, [filter, search, data]);

  return {
    filteredData,
    filter,
    search,
  };
}
export default useFilteredData;
