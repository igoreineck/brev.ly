import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { router } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 p-8">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
