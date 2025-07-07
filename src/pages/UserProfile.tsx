import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Shield, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

const UserProfile = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className={`flex-1 overflow-auto ${isMobile ? 'pb-20' : ''}`}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-[#1976D2]" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Profile Information */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Update your personal and professional information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#1976D2] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">DS</span>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="dark:text-gray-300">Full Name</Label>
                  <Input id="fullName" defaultValue="Dr. Smith" className="dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                  <Input id="email" type="email" defaultValue="dr.smith@hospital.com" className="dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty" className="dark:text-gray-300">Medical Specialty</Label>
                  <Select defaultValue="internal-medicine">
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license" className="dark:text-gray-300">Medical License</Label>
                  <Input id="license" defaultValue="MD-12345-TX" className="dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#1976D2] hover:bg-[#1565C0]">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Preferences */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Settings className="h-5 w-5" />
                <span>AI Assistant Preferences</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Configure your AI assistant settings and default prompts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultModel">Default AI Model</Label>
                  <Select defaultValue="gpt-4o">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultPrompt">Default Prompt Set</Label>
                  <Select defaultValue="general-medicine">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general-medicine">General Medicine</SelectItem>
                      <SelectItem value="cardiology">Cardiology Focused</SelectItem>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="dark:border-gray-700" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium dark:text-white">Feature Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-white">Dark Mode</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enable dark theme for low-light environments</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-white">Voice-Only Mode</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enable hands-free operation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-white">Auto-Pin Important Notes</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Automatically save critical findings to patient memory</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-white">Real-time Transcription</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Show live transcription during sessions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Usage Statistics</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Your activity summary and patient management stats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1976D2]">24</p>
                  <p className="text-sm text-gray-600">Active Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#81C784]">156</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FFB74D]">89</p>
                  <p className="text-sm text-gray-600">AI Analyses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">12</p>
                  <p className="text-sm text-gray-600">Custom Prompts</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last session with Ali Rehman</span>
                    <span className="text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Created new prompt template</span>
                    <span className="text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Updated patient notes for Sarah Khan</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Shield className="h-5 w-5" />
                <span>Security & Privacy</span>
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage your account security and data privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Enabled
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Demo Mode Card */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 border-2 border-dashed border-[#1976D2]">
            <CardHeader>
              <CardTitle className="text-[#1976D2]">🧪 Demo Mode</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Perfect for showcasing to investors or during presentations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Experience a complete patient consultation workflow with pre-loaded data, simulated voice input, and AI-generated medical notes.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="/demo" target="_blank" rel="noopener noreferrer">
                  Launch Demo Mode
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
