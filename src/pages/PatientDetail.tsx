
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, FileText, Activity, User } from "lucide-react";

const PatientDetail = () => {
  const { patientId } = useParams();

  const mockPatient = {
    id: patientId,
    name: "Ali Rehman",
    age: 45,
    gender: "Male",
    dateOfBirth: "1979-03-15",
    phone: "+92 300 1234567",
    email: "ali.rehman@email.com",
    address: "123 Main St, Karachi, Pakistan",
    condition: "Diabetes Type 2",
    avatar: "AR"
  };

  const mockSessions = [
    {
      id: "1",
      date: "2024-01-15",
      type: "Follow-up",
      duration: "15 min",
      notes: "Blood sugar levels improved. Patient compliance good with medication.",
      tags: ["Routine", "Diabetes Management"]
    },
    {
      id: "2", 
      date: "2024-01-08",
      type: "Consultation",
      duration: "30 min", 
      notes: "Chest pain evaluation. EKG normal, troponin negative.",
      tags: ["Chest Pain", "Cardiology"]
    },
    {
      id: "3",
      date: "2024-01-01", 
      type: "Initial Visit",
      duration: "45 min",
      notes: "Comprehensive evaluation. Diabetes diagnosis confirmed.",
      tags: ["New Patient", "Diagnosis"]
    }
  ];

  const mockVitals = [
    { date: "2024-01-15", bp: "130/80", hr: "72", temp: "98.6°F", weight: "175 lbs" },
    { date: "2024-01-08", bp: "135/85", hr: "78", temp: "98.4°F", weight: "176 lbs" },
    { date: "2024-01-01", bp: "140/90", hr: "80", temp: "98.7°F", weight: "178 lbs" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Patients
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#1976D2] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{mockPatient.avatar}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{mockPatient.name}</h1>
                  <p className="text-gray-600">{mockPatient.age} years • {mockPatient.gender}</p>
                </div>
              </div>
            </div>
            <Button className="bg-[#1976D2] hover:bg-[#1565C0]" asChild>
              <Link to={`/patients/${patientId}/sessions`}>
                Start New Session
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Patient Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{mockPatient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{mockPatient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-sm">{mockPatient.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Demographics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium">{mockPatient.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium">{mockPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{mockPatient.gender}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Current Condition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Primary Diagnosis</p>
                  <p className="font-medium">{mockPatient.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className="bg-[#81C784] text-white">Stable</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Visit</p>
                  <p className="font-medium">Jan 15, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="sessions" className="space-y-4">
              {mockSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{session.type}</CardTitle>
                        <CardDescription>
                          {new Date(session.date).toLocaleDateString()} • {session.duration}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/sessions/${session.id}/messages`}>
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">{session.notes}</p>
                    <div className="flex flex-wrap gap-2">
                      {session.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs History</CardTitle>
                  <CardDescription>Track patient's vital signs over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Blood Pressure</th>
                          <th className="text-left py-2">Heart Rate</th>
                          <th className="text-left py-2">Temperature</th>
                          <th className="text-left py-2">Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockVitals.map((vital, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{new Date(vital.date).toLocaleDateString()}</td>
                            <td className="py-2">{vital.bp}</td>
                            <td className="py-2">{vital.hr} bpm</td>
                            <td className="py-2">{vital.temp}</td>
                            <td className="py-2">{vital.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Notes</CardTitle>
                  <CardDescription>Long-term patient memory and clinical observations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Pinned Note</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Patient has good medication compliance. Prefers morning appointments. 
                      History of medication allergies to penicillin.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Treatment Plan</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Continue current diabetes management with Metformin 500mg BID. 
                      Follow-up in 3 months with HbA1c. Patient education on diet compliance ongoing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
