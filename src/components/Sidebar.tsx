
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

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Users, label: "Patients", path: "/dashboard" },
    { icon: FileText, label: "Prompts", path: "/prompts" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-[#1976D2]" />
          <h1 className="text-xl font-bold text-gray-900">MedAssist AI</h1>
        </div>
      </div>

      {/* New Session Button */}
      <div className="p-4">
        <Button className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white flex items-center space-x-2">
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
                ? "bg-[#E3F2FD] text-[#1976D2]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#1976D2] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">DS</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
            <p className="text-xs text-gray-500">Internal Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
