
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Calendar, 
  Activity,
  FileText,
  Bell
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePatients } from "@/hooks/usePatients";
import { useNotifications } from "@/hooks/useNotifications";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { patients, loading: patientsLoading, createPatient } = usePatients();
  const { notifications, unreadCount } = useNotifications();
  const { logActivity } = useActivityLogs();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCondition, setFilterCondition] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    avatar: ""
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = filterCondition === "all" || patient.condition === filterCondition;
    return matchesSearch && matchesCondition;
  });

  const conditions = Array.from(new Set(patients.map(p => p.condition).filter(Boolean)));

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const patientData = {
        name: newPatient.name,
        age: parseInt(newPatient.age),
        gender: newPatient.gender,
        condition: newPatient.condition,
        avatar: newPatient.avatar
      };
      
      await createPatient(patientData);
      await logActivity('patient_created', `Created new patient: ${newPatient.name}`);
      
      setNewPatient({ name: "", age: "", gender: "", condition: "", avatar: "" });
      setIsCreateDialogOpen(false);
      toast({ title: "Patient created successfully!" });
    } catch (error) {
      toast({
        title: "Error creating patient",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const quickStats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: User,
      color: "text-blue-600"
    },
    {
      title: "Active Sessions",
      value: patients.reduce((acc, p) => acc + (p.condition ? 1 : 0), 0),
      icon: Activity,
      color: "text-green-600"
    },
    {
      title: "Notifications",
      value: unreadCount,
      icon: Bell,
      color: "text-orange-600"
    },
    {
      title: "This Month",
      value: new Date().getDate(),
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  if (patientsLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1976D2]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className={`flex-1 overflow-auto ${isMobile ? 'pb-20' : ''}`}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your patients and sessions</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1976D2] hover:bg-[#1565C0] w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                  <DialogDescription>
                    Enter the patient's information to create a new record.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreatePatient} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter patient name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                        placeholder="Enter age"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={newPatient.gender} onValueChange={(value) => setNewPatient(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="condition">Primary Condition</Label>
                      <Input
                        id="condition"
                        value={newPatient.condition}
                        onChange={(e) => setNewPatient(prev => ({ ...prev, condition: e.target.value }))}
                        placeholder="e.g., Hypertension"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="avatar">Avatar (optional)</Label>
                    <Input
                      id="avatar"
                      value={newPatient.avatar}
                      onChange={(e) => setNewPatient(prev => ({ ...prev, avatar: e.target.value }))}
                      placeholder="Enter avatar text or emoji"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#1976D2] hover:bg-[#1565C0]">
                      Create Patient
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCondition} onValueChange={setFilterCondition}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    {conditions.map(condition => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1976D2] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm md:text-base font-medium">
                        {patient.avatar || patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base md:text-lg dark:text-white">{patient.name}</CardTitle>
                      <CardDescription className="text-xs md:text-sm dark:text-gray-400">
                        {patient.age} years • {patient.gender}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {patient.condition && (
                      <Badge variant="secondary" className="w-fit">
                        {patient.condition}
                      </Badge>
                    )}
                    <div className="flex flex-col md:flex-row gap-2">
                      <Link to={`/patient/${patient.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <User className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                      </Link>
                      <Link to={`/patient/${patient.id}/sessions`} className="flex-1">
                        <Button size="sm" className="w-full bg-[#1976D2] hover:bg-[#1565C0]">
                          <FileText className="h-4 w-4 mr-1" />
                          Sessions
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8 md:p-12 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No patients found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm || filterCondition !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Get started by adding your first patient"}
                </p>
                {!searchTerm && filterCondition === "all" && (
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#1976D2] hover:bg-[#1565C0]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Patient
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
