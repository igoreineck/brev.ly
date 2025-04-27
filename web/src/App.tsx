import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { router } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="h-screen w-screen bg-gray-200 p-8">
      <div className="container mx-auto">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster richColors />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
