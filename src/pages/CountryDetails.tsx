import Button from "@/components/ui/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import data from "../../starter-files/data.json";

function CountryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className="text-base">
      <Button onClick={handleBackButton} withIcon>
        <ArrowLongLeftIcon className="size-6" /> Back
      </Button>

      <section className="mt-12 flex flex-col items-center justify-between gap-12 md:flex-row lg:gap-40">
        <figure className="flex aspect-video max-w-md place-items-center self-stretch overflow-hidden border-2 border-white">
          <img className="w-full" src="https://flagcdn.com/be.svg" alt="flag" />
        </figure>

        <div className="flex-1">
          <h2 className="my-6 text-2xl font-bold">Belgium</h2>

          <dl className="flex flex-col gap-12 md:flex-row lg:gap-40 ">
            <div className="space-y-2">
              <DataItem term="Native Name">desc</DataItem>
              <DataItem term="Population">desc</DataItem>
              <DataItem term="Region">desc</DataItem>
              <DataItem term="Sub Region">desc</DataItem>
              <DataItem term="Capital">desc</DataItem>
            </div>

            <div className="space-y-2">
              <DataItem term="Top Level Domain">desc</DataItem>
              <DataItem term="Currencies">desc</DataItem>
              <DataItem term="Language">desc</DataItem>
            </div>
          </dl>

          <dl className="w-full ">
            <DataItem
              term="Border Countries"
              className="flex w-full items-center gap-2 max-sm:flex-wrap"
            >
              {["France", "Germany", "Netherlands"].map((country) => (
                <Button className="flex-1" asChild>
                  <Link to={`/`}>{country}</Link>
                </Button>
              ))}
            </DataItem>
          </dl>
        </div>
      </section>
    </div>
  );
}
export default CountryDetails;

function DataItem({
  term,
  className,
  children,
}: {
  term: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-start space-x-1 md:items-center ${
        className ? "mt-12 flex-col gap-2 md:flex-row" : ""
      }`}
    >
      <dt className="font-semibold ">{term}: </dt>
      <dd className={`max-w-sm ${className}`}>{children}</dd>
    </div>
  );
}
