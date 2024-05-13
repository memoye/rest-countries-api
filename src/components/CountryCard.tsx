import { DataItem } from "@/pages/CountryDetails";
import { formatNumber } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Country } from "@/lib/definitions";

export type CountryCardProps = Pick<
  Country,
  "flags" | "name" | "population" | "region" | "capital"
>;

function CountryCard({
  capital,
  flags,
  name,
  population,
  region,
}: CountryCardProps) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/country/${"somewhere"}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer overflow-hidden rounded bg-light-element drop-shadow-lg transition hover:brightness-95 dark:bg-dark-element"
    >
      <figure className="mb-2 h-1/2 min-h-44 overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={flags.svg || flags.png}
          alt={flags.alt}
        />
      </figure>

      <div className="px-4 py-2 pb-10">
        <h2 className="mb-3 text-lg font-bold">{name.official}</h2>
        <dl className="space-y-1.5">
          <DataItem term="Population">{formatNumber(population)}</DataItem>
          <DataItem term="Region">{region}</DataItem>
          <DataItem term="Capital">{capital.join(", ")}</DataItem>
        </dl>
      </div>
    </div>
  );
}
export default CountryCard;
