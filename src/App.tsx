import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Onboarding from "./pages/Onboarding";
import Feed from "./pages/Feed";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SelectRole from "./pages/SelectRole";

const queryClient = new QueryClient();

type AppFlow = "loading" | "onboarding" | "auth" | "app";

const App = () => {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>("loading");

  const handleLoadingComplete = () => {
    setCurrentFlow("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentFlow("auth");
  };

  const handleAuthComplete = () => {
    setCurrentFlow("app");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {currentFlow === "loading" && (
          <LoadingScreen onReady={handleLoadingComplete} />
        )}
        
        {currentFlow === "onboarding" && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        
        {currentFlow === "auth" && (
          <Auth onComplete={handleAuthComplete} />
        )}
        
        {currentFlow === "app" && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/select-role" element={<SelectRole />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
