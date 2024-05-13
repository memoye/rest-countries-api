import Header from "./Header";
import { ThemeProvider } from "@/context/theme-provider";

function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider storageKey="rest-countries-theme">
      <div className="flex min-h-dvh flex-col bg-light-background text-light-text antialiased dark:bg-dark-background dark:text-dark-text">
        <Header />
        <main className="mx-auto mt-8 w-11/12 flex-1 scroll-m-8 px-4 md:w-11/12 md:px-0">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default SharedLayout;
