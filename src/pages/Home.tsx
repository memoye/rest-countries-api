import FilterDropdown from "@/components/FiterDropdown";
import SearchInput from "@/components/SearchInput";

function Home() {
  return (
    <div className="text-sm">
      <div className="flex items-center justify-between">
        <SearchInput />
        <FilterDropdown />
      </div>
    </div>
  );
}
export default Home;
