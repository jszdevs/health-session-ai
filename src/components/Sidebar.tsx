
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  Plus,
  User
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Users, label: "Patients", path: "/dashboard" },
    { icon: FileText, label: "Prompts", path: "/prompts" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // Hide sidebar on mobile (use MobileNav instead)
  if (isMobile) {
    return null;
  }

  const createNewSession = () => {
    // This will redirect to the first patient's session page
    const savedPatients = localStorage.getItem('medassist-patients');
    if (savedPatients) {
      const patients = JSON.parse(savedPatients);
      if (patients.length > 0) {
        window.location.href = `/patients/${patients[0].id}/sessions`;
      }
    } else {
      // If no patients, go to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-[#1976D2]" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">MedAssist AI</h1>
        </div>
      </div>

      {/* New Session Button */}
      <div className="p-4">
        <Button 
          onClick={createNewSession}
          className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Session</span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-[#E3F2FD] text-[#1976D2] dark:bg-blue-900/20"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#1976D2] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">DS</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Smith</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Internal Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
