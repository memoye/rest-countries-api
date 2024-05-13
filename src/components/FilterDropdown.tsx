import Select from "./ui/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Continent } from "@/lib/definitions";
import { isContinent } from "@/lib/utils";

const CONTINENTS: {
  displayText: Continent;
  value: Continent;
}[] = [
  { displayText: "Africa", value: "Africa" },
  { displayText: "Antarctica", value: "Antarctica" },
  { displayText: "Asia", value: "Asia" },
  { displayText: "Europe", value: "Europe" },
  { displayText: "North America", value: "North America" },
  { displayText: "Oceania", value: "Oceania" },
  { displayText: "South America", value: "South America" },
];

function FiterDropDown() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const navigate = useNavigate();

  function setFilter(term: string) {
    if (term && isContinent(term)) {
      searchParams.set("filter", term);
    } else {
      searchParams.delete("filter");
    }
    navigate(`/?${searchParams.toString()}`, {
      replace: true,
    });
  }

  return (
    <Select
      placeholder="Filter by Region"
      onChange={(value) => setFilter(value)}
      options={CONTINENTS}
      defaultValue={
        isContinent(filter)
          ? {
              displayText: filter,
              value: filter,
            }
          : undefined
      }
    />
  );
}
export default FiterDropDown;
