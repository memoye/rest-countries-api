import { Continent } from "./definitions";

export function formatNumber(number: number) {
  return number.toLocaleString();
}

export function isContinent(str?: string | null): str is Continent {
  if (!str) return false;
  const continentValues = [
    "Africa",
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Oceania",
    "Antarctica",
  ];
  return continentValues.includes(str);
}

export function deserializeQueryParams(
  params:
    | Record<string | number | symbol, string | number | boolean>
    | undefined
) {
  if (!params) return null;

  const queryParams = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

  return queryParams;
}
