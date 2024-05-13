import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SharedLayout from "./components/SharedLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SharedLayout>
        <Outlet />
      </SharedLayout>
    </QueryClientProvider>
  );
}

export default App;
