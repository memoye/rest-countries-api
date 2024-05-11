import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="bg-light-element py-4 dark:bg-dark-element">
      <div className="mx-auto flex w-11/12 items-center justify-between md:w-11/12">
        <h1 className="">Where in the world?</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
