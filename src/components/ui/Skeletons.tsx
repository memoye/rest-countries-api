import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const shimmer =
  "before:absolute relative overflow-hidden before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-dark-background before:via-light-background before:to-transparent";

const background = "bg-gray-200 dark:bg-dark-element";

export function CountryDetailsSkeleton() {
  const navigate = useNavigate();

  function handleBackButton() {
    navigate(-1);
  }

  return (
    <div className={`py-4 text-base`}>
      <Button onClick={handleBackButton} withIcon>
        <ArrowLongLeftIcon className="size-6" /> Back
      </Button>

      <section className="mt-12 flex w-full flex-col  items-center gap-12 lg:flex-row ">
        <div
          className={`${shimmer} ${background} mx-auto flex aspect-video w-full max-w-lg flex-1 place-items-center self-stretch overflow-hidden rounded lg:mx-0`}
        />

        <div
          className={` box-border px-8 max-sm:mx-auto lg:mx-0 lg:max-w-[50%]`}
        >
          <TextSkeleton size="md" className="my-6 w-28" animate />

          <div
            className={`flex flex-col flex-wrap items-start justify-between gap-2 md:flex-row lg:gap-16 `}
          >
            <div className={`space-y-3 ${shimmer}`}>
              <DataItemSkeleton />
              <DataItemSkeleton />
              <DataItemSkeleton />
              <DataItemSkeleton />
              <DataItemSkeleton />
            </div>

            <div className={`space-y-3 ${shimmer}`}>
              <DataItemSkeleton />
              <DataItemSkeleton />
              <DataItemSkeleton />
            </div>
          </div>

          <div
            className={`${shimmer} mt-6 flex flex-wrap items-start gap-2 space-x-1  lg:flex-nowrap lg:items-center`}
          >
            <TextSkeleton className="w-24" />
            <div className="flex w-full max-w-sm items-center gap-2 max-sm:flex-wrap">
              <TextSkeleton className="w-20 rounded" size="lg" />
              <TextSkeleton className="w-20 rounded" size="lg" />
              <TextSkeleton className="w-20 rounded" size="lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function DataItemSkeleton({ animate }: { animate?: boolean }) {
  return (
    <div
      className={`${
        animate && shimmer
      } flex flex-wrap items-start gap-2 space-x-1 lg:items-center`}
    >
      <TextSkeleton className="w-16" />
      <TextSkeleton className="w-28" />
    </div>
  );
}

export function TextSkeleton({
  size = "sm",
  className,
  animate,
}: {
  animate?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeObj: Record<typeof size, string> = {
    sm: "h-5",
    md: "h-6",
    lg: "h-8",
  };

  return (
    <div
      className={`${background} ${animate && shimmer} ${
        sizeObj[size]
      } ${className} `}
    />
  );
}

export function CountryCardSkeleton() {
  return (
    <div
      className={`${shimmer} h-fit overflow-hidden rounded bg-light-element drop-shadow-lg transition dark:bg-dark-element/20`}
    >
      <div className={`${background} ${shimmer} h-52 w-full overflow-hidden`} />

      <div className={"px-4 py-2 pb-10 dark:bg-dark-background/10"}>
        <TextSkeleton animate size="md" className="mb-3 mt-4 w-32" />
        <div className={`space-y-2`}>
          <DataItemSkeleton />
          <DataItemSkeleton />
          <DataItemSkeleton />
        </div>
      </div>
    </div>
  );
}

export function CountryCardsSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
        <CountryCardSkeleton key={i} />
      ))}
    </>
  );
}
