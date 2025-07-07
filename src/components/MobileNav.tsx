
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Settings, 
  Plus,
  User,
  Menu,
  Stethoscope
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Users, label: "Patients", path: "/dashboard" },
    { icon: FileText, label: "Prompts", path: "/prompts" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

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
    setIsOpen(false);
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-[#1976D2]" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">MedAssist AI</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div className="bg-white dark:bg-gray-900 w-64 h-full p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <Button 
              onClick={createNewSession}
              className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white flex items-center space-x-2 h-12"
            >
              <Plus className="h-5 w-5" />
              <span>New Session</span>
            </Button>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-[#E3F2FD] text-[#1976D2] dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-2 z-40">
        <div className="flex justify-around">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-[#E3F2FD] text-[#1976D2] dark:bg-blue-900/20"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
