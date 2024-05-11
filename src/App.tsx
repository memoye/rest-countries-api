import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <ThemeProvider storageKey="rest-countries-theme">
      <div className="flex min-h-dvh flex-col bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
        <Header />
        <main className="mx-auto w-11/12 flex-1 md:w-11/12">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
