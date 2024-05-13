import useWindowScrolled from "@/hooks/useWindowScrolled";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";

function Header() {
  const { scrolled } = useWindowScrolled({ triggerAt: 400 });

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header
        className={`z-30 bg-light-element py-3 transition-[top] dark:bg-dark-element ${
          scrolled ? "sticky top-0 drop-shadow-md" : "-top-10"
        }`}
      >
        <div className="mx-auto flex w-11/12 items-center justify-between md:w-11/12">
          <h1 className="text-lg font-bold">Where in the world?</h1>
          <ThemeToggle />
        </div>
      </header>

      {scrolled && (
        <Button
          className="fixed bottom-4 right-4 z-30
        "
          onClick={handleBackToTop}
        >
          <span className="sr-only">Back to top</span>
          <ArrowLongUpIcon className="size-6" />
        </Button>
      )}
    </>
  );
}

export default Header;
