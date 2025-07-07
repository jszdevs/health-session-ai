
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PatientSessions from "./pages/PatientSessions";
import PatientDetail from "./pages/PatientDetail";
import PromptsManager from "./pages/PromptsManager";
import SessionMessages from "./pages/SessionMessages";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn onAuth={() => setIsAuthenticated(true)} />} />
            <Route path="/signup" element={<SignUp onAuth={() => setIsAuthenticated(true)} />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <SignIn onAuth={() => setIsAuthenticated(true)} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients/:patientId" element={<PatientDetail />} />
            <Route path="/patients/:patientId/sessions" element={<PatientSessions />} />
            <Route path="/sessions/:sessionId/messages" element={<SessionMessages />} />
            <Route path="/prompts" element={<PromptsManager />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
