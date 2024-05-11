import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button className="" onClick={handleThemeToggle}>
      {theme === "light" ? (
        <>
          <MoonIcon className="inline-block size-6" /> <span>Dark Mode</span>
        </>
      ) : (
        <>
          <SunIcon className="inline-block size-6" /> <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
export default ModeToggle;
