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
    <button
      className={`flex items-center space-x-2 p-2 font-semibold `}
      onClick={handleThemeToggle}
    >
      {theme === "light" ? (
        <>
          <MoonIcon className="size-6" /> <span>Dark Mode</span>
        </>
      ) : (
        <>
          <SunIcon className="size-6" /> <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
export default ModeToggle;
