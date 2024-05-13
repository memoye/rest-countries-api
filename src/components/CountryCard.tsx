import { DataItem } from "@/pages/CountryDetails";
import { formatNumber } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Country } from "@/lib/definitions";
import { useSpring, animated } from "@react-spring/web";
// import { animated } from "@react-spring/web";

export type CountryCardProps = Pick<
  Country,
  "flags" | "name" | "population" | "region" | "capital" | "continents" | "cca2"
> & { index: number };

function CountryCard({
  capital,
  cca2,
  flags,
  name,
  population,
  region,
  continents = [],
  index,
}: CountryCardProps) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/country/${cca2}`);
  }

  const springs = useSpring({
    from: {
      y:
        index > 2
          ? 10 - index * Math.random() * -12
          : index < 12
          ? index * (100 * Math.random() + index)
          : 12,
      x:
        index > 2
          ? 10 - index * Math.random() * -12
          : index < 12
          ? 12 - index * (100 * Math.random() + index)
          : 12,
      opacity: 0,
    },
    to: { y: 0, x: 0, opacity: 1 },
    reset: true,
    config: {
      duration: 150,
      precision: 0.3,
    },
  });

  return (
    <animated.div
      onClick={handleNavigate}
      className="group max-w-xs cursor-pointer overflow-hidden rounded bg-light-element drop-shadow-lg transition hover:brightness-95 dark:bg-dark-element"
      style={springs}
    >
      <figure className="mb-2 h-1/2 min-h-44 overflow-hidden">
        <img
          className="h-full w-full object-cover object-center lg:transition-transform lg:group-hover:scale-105"
          src={flags.svg || flags.png}
          alt={flags.alt}
        />
      </figure>

      <div className="px-4 py-2 pb-10">
        <h2 className="mb-3 text-lg font-bold">{name.common}</h2>
        <span className="sr-only">Continents: {continents.join(", ")}</span>
        <dl className="space-y-1.5">
          <DataItem term="Population">{formatNumber(population)}</DataItem>
          <DataItem term="Region">{region}</DataItem>
          <DataItem term="Capital">{capital.join(", ")}</DataItem>
        </dl>
      </div>
    </animated.div>
  );
}
export default CountryCard;
