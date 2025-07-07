
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, Play, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockPatients = [
    {
      id: "1",
      name: "Ali Rehman",
      age: 45,
      gender: "Male",
      lastVisit: "2024-01-15",
      condition: "Diabetes",
      tags: ["Follow-up", "Chronic"],
      avatar: "AR"
    },
    {
      id: "2", 
      name: "Sarah Khan",
      age: 32,
      gender: "Female",
      lastVisit: "2024-01-12",
      condition: "Hypertension",
      tags: ["New Patient"],
      avatar: "SK"
    },
    {
      id: "3",
      name: "Zoya Ahmed", 
      age: 28,
      gender: "Female",
      lastVisit: "2024-01-10",
      condition: "Pediatric Care",
      tags: ["Urgent", "Lab Review"],
      avatar: "ZA"
    }
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600">Manage your patients and start new sessions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-[#E3F2FD] rounded-lg">
                  <User className="h-6 w-6 text-[#1976D2]" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
                  <Play className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#1976D2] rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{patient.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>
                        {patient.age} years • {patient.gender}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Condition</p>
                    <p className="font-medium text-gray-900">{patient.condition}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {patient.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant={tag === "Urgent" ? "destructive" : "secondary"}
                        className={tag === "Follow-up" ? "bg-[#81C784] text-white" : 
                                 tag === "Lab Review" ? "bg-[#FFB74D] text-white" : ""}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-[#1976D2] hover:bg-[#1565C0]"
                      asChild
                    >
                      <Link to={`/patients/${patient.id}/sessions`}>
                        <Play className="h-4 w-4 mr-2" />
                        New Session
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      asChild
                    >
                      <Link to={`/patients/${patient.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View History
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
