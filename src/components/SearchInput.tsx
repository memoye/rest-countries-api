import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

function SearchInput() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;

      if (term) {
        searchParams.set("search", term);
      } else {
        searchParams.delete("search");
      }
      navigate(`/?${searchParams.toString()}`, {
        replace: true,
      });
    },
    300
  );

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="min-w-32 max-sm:w-full"
    >
      <div className="relative w-full overflow-hidden rounded text-light-text-input dark:text-dark-text-input">
        <label
          htmlFor="search"
          className="absolute left-3 top-1/2 -translate-y-1/2"
        >
          <MagnifyingGlassIcon className="size-6" />
          <span className="sr-only">Search Country</span>
        </label>

        <input
          className="w-full bg-light-element p-3 px-12 font-semibold tracking-wider outline-none placeholder:font-semibold dark:bg-dark-element"
          type="search"
          name="search"
          id="search"
          defaultValue={searchParams.get("search")?.toString()}
          placeholder="Search for a country..."
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}
export default SearchInput;
