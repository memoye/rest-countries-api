import { ErrorComponent } from "@/pages/Home";
import SharedLayout from "./SharedLayout";
import { useRouteError } from "react-router-dom";

function ErrorElement({ message }: { message?: string; status?: number }) {
  const error = useRouteError() as any;

  console.log(error);

  return (
    <SharedLayout>
      <ErrorComponent
        title={error.status === 404 ? "Page not found!" : undefined}
        message={message ? message : error?.data}
      />
    </SharedLayout>
  );
}
export default ErrorElement;
