
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PatientDetail from "./pages/PatientDetail";
import PatientSessions from "./pages/PatientSessions";
import SessionMessages from "./pages/SessionMessages";
import PromptsManager from "./pages/PromptsManager";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1976D2]"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patient/:patientId" element={<PatientDetail />} />
      <Route path="/patient/:patientId/sessions" element={<PatientSessions />} />
      <Route path="/session/:sessionId/messages" element={<SessionMessages />} />
      <Route path="/sessions/:sessionId/messages" element={<SessionMessages />} />
      <Route path="/prompts" element={<PromptsManager />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
