
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Plus, 
  Calendar,
  Activity,
  FileText
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  avatar: string;
  tags: string[];
}

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    tags: ""
  });

  // Load patients from localStorage on component mount
  useEffect(() => {
    const savedPatients = localStorage.getItem('medassist-patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    } else {
      // Default mock patients
      const mockPatients: Patient[] = [
        {
          id: "1",
          name: "Ali Rehman",
          age: 45,
          gender: "Male",
          condition: "Diabetes",
          lastVisit: "2024-01-15",
          avatar: "AR",
          tags: ["Diabetes", "Follow-up"]
        },
        {
          id: "2", 
          name: "Sarah Khan",
          age: 32,
          gender: "Female",
          condition: "Hypertension",
          lastVisit: "2024-01-12",
          avatar: "SK",
          tags: ["Hypertension", "Routine"]
        },
        {
          id: "3",
          name: "Zoya Ahmed", 
          age: 28,
          gender: "Female",
          condition: "Asthma",
          lastVisit: "2024-01-10",
          avatar: "ZA",
          tags: ["Asthma", "Urgent"]
        }
      ];
      setPatients(mockPatients);
      localStorage.setItem('medassist-patients', JSON.stringify(mockPatients));
    }
  }, []);

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age) return;
    
    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender || "Not specified",
      condition: newPatient.condition || "General",
      lastVisit: new Date().toISOString().split('T')[0],
      avatar: newPatient.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      tags: newPatient.tags ? newPatient.tags.split(',').map(t => t.trim()) : []
    };

    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem('medassist-patients', JSON.stringify(updatedPatients));
    
    setNewPatient({ name: "", age: "", gender: "", condition: "", tags: "" });
    setIsDialogOpen(false);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className={`flex-1 overflow-auto ${isMobile ? 'pb-20' : ''}`}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-[#1976D2]" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Patient Dashboard</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Manage your patients and sessions</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredPatients.length} patients
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Search and Add Patient */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients by name, condition, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1976D2] hover:bg-[#1565C0] whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Add New Patient</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    Create a new patient record
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="dark:text-gray-300">Name *</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="dark:text-gray-300">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender" className="dark:text-gray-300">Gender</Label>
                      <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({...newPatient, gender: value})}>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
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
                      <Label htmlFor="condition" className="dark:text-gray-300">Primary Condition</Label>
                      <Input
                        id="condition"
                        value={newPatient.condition}
                        onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                        placeholder="e.g., Diabetes"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tags" className="dark:text-gray-300">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newPatient.tags}
                      onChange={(e) => setNewPatient({...newPatient, tags: e.target.value})}
                      placeholder="e.g., Follow-up, Urgent"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <Button onClick={handleAddPatient} className="w-full bg-[#1976D2] hover:bg-[#1565C0]">
                    Add Patient
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#1976D2]" />
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{patients.length}</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-[#81C784]" />
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">12</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Active Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#FFB74D]" />
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">28</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">156</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1976D2] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm md:text-base font-medium">{patient.avatar}</span>
                      </div>
                      <div>
                        <CardTitle className="text-base md:text-lg dark:text-white">{patient.name}</CardTitle>
                        <CardDescription className="text-sm dark:text-gray-400">
                          {patient.age} • {patient.gender}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {patient.condition}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {patient.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button 
                        asChild 
                        size="sm" 
                        className="bg-[#1976D2] hover:bg-[#1565C0] flex-1"
                      >
                        <Link to={`/patients/${patient.id}/sessions`}>
                          New Session
                        </Link>
                      </Button>
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                      >
                        <Link to={`/patients/${patient.id}`}>
                          View History
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No patients found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm ? "Try a different search term" : "Add your first patient to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
