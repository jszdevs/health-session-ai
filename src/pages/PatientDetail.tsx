
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar, FileText, Activity, User, Lightbulb, GitCompare, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "@/components/MobileNav";

const PatientDetail = () => {
  const { patientId } = useParams();
  const isMobile = useIsMobile();

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
      notes: "Blood sugar levels improved. Patient compliance good with medication. Reports occasional headaches.",
      tags: ["Routine", "Diabetes Management"],
      symptoms: ["Improved glucose control", "Occasional headaches"],
      medications: ["Metformin 500mg BID", "Lisinopril 10mg daily"]
    },
    {
      id: "2", 
      date: "2024-01-08",
      type: "Consultation",
      duration: "30 min", 
      notes: "Chest pain evaluation. EKG normal, troponin negative. Patient reports persistent cough.",
      tags: ["Chest Pain", "Cardiology"],
      symptoms: ["Chest pain (resolved)", "Persistent cough"],
      medications: ["Metformin 500mg BID", "Added Cough suppressant"]
    },
    {
      id: "3",
      date: "2024-01-01", 
      type: "Initial Visit",
      duration: "45 min",
      notes: "Comprehensive evaluation. Diabetes diagnosis confirmed. Started on Metformin.",
      tags: ["New Patient", "Diagnosis"],
      symptoms: ["Frequent urination", "Fatigue", "Dry cough"],
      medications: ["Started Metformin 500mg BID"]
    }
  ];

  const mockVitals = [
    { date: "2024-01-15", bp: "130/80", hr: "72", temp: "98.6°F", weight: "175 lbs" },
    { date: "2024-01-08", bp: "135/85", hr: "78", temp: "98.4°F", weight: "176 lbs" },
    { date: "2024-01-01", bp: "140/90", hr: "80", temp: "98.7°F", weight: "178 lbs" }
  ];

  // Smart follow-up suggestions based on patient history
  const smartSuggestions = [
    {
      id: 1,
      type: "symptom_followup",
      priority: "high",
      suggestion: "Ask about the persistent cough mentioned in the last visit - has it improved?",
      context: "Patient reported persistent cough on Jan 8th",
      icon: AlertCircle,
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      id: 2,
      type: "medication_compliance",
      priority: "medium",
      suggestion: "Check medication compliance for Metformin - any side effects?",
      context: "Patient started on Metformin 3 weeks ago",
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 3,
      type: "vital_trend",
      priority: "low",
      suggestion: "Blood pressure trending down - ask about lifestyle changes",
      context: "BP improved from 140/90 to 130/80",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <MobileNav />
      
      <div className={`flex-1 overflow-auto ${isMobile ? 'pb-20' : ''}`}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Patients
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1976D2] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{mockPatient.avatar}</span>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{mockPatient.name}</h1>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{mockPatient.age} years • {mockPatient.gender}</p>
                </div>
              </div>
            </div>
            <Button className="bg-[#1976D2] hover:bg-[#1565C0] w-full md:w-auto" asChild>
              <Link to={`/patients/${patientId}/sessions`}>
                Start New Session
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Smart Follow-up Suggestions */}
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl dark:text-white">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Smart Follow-up Suggestions
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                AI-powered suggestions based on patient history and previous visits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {smartSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <suggestion.icon className={`h-5 w-5 mt-0.5 ${suggestion.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {suggestion.suggestion}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Context: {suggestion.context}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                      suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    }`}
                  >
                    {suggestion.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Patient Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{mockPatient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{mockPatient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{mockPatient.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Demographics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                  <p className="font-medium text-gray-900 dark:text-white">{mockPatient.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                  <p className="font-medium text-gray-900 dark:text-white">{mockPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
                  <p className="font-medium text-gray-900 dark:text-white">{mockPatient.gender}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Current Condition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Primary Diagnosis</p>
                  <p className="font-medium text-gray-900 dark:text-white">{mockPatient.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <Badge className="bg-[#81C784] text-white dark:bg-green-600">Stable</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Visit</p>
                  <p className="font-medium text-gray-900 dark:text-white">Jan 15, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="sessions" className="space-y-4">
              {mockSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg dark:text-white">{session.type}</CardTitle>
                        <CardDescription className="dark:text-gray-400">
                          {new Date(session.date).toLocaleDateString()} • {session.duration}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
                        <Link to={`/sessions/${session.id}/messages`}>
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{session.notes}</p>
                    <div className="flex flex-wrap gap-2">
                      {session.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="compare" className="space-y-4">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl dark:text-white">
                    <GitCompare className="h-5 w-5 mr-2 text-[#1976D2]" />
                    Compare Past Sessions
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Side-by-side comparison of patient state across visits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Latest Session */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Latest Visit</h3>
                        <Badge className="bg-[#1976D2] text-white">Jan 15, 2024</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Symptoms</p>
                          <div className="mt-1 space-y-1">
                            {mockSessions[0].symptoms.map((symptom, idx) => (
                              <Badge key={idx} variant="outline" className="mr-2 text-xs dark:border-gray-600 dark:text-gray-300">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Medications</p>
                          <div className="mt-1 space-y-1">
                            {mockSessions[0].medications.map((med, idx) => (
                              <p key={idx} className="text-sm text-gray-900 dark:text-gray-300">• {med}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vitals</p>
                          <p className="text-sm text-gray-900 dark:text-gray-300">BP: 130/80, HR: 72 bpm</p>
                        </div>
                      </div>
                    </div>

                    {/* Previous Session */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Previous Visit</h3>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Jan 8, 2024</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Symptoms</p>
                          <div className="mt-1 space-y-1">
                            {mockSessions[1].symptoms.map((symptom, idx) => (
                              <Badge key={idx} variant="outline" className="mr-2 text-xs dark:border-gray-600 dark:text-gray-300">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Medications</p>
                          <div className="mt-1 space-y-1">
                            {mockSessions[1].medications.map((med, idx) => (
                              <p key={idx} className="text-sm text-gray-900 dark:text-gray-300">• {med}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vitals</p>
                          <p className="text-sm text-gray-900 dark:text-gray-300">BP: 135/85, HR: 78 bpm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Changes */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Changes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">Improved</Badge>
                        <span className="text-sm text-gray-900 dark:text-gray-300">Blood pressure decreased (135/85 → 130/80)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">Ongoing</Badge>
                        <span className="text-sm text-gray-900 dark:text-gray-300">Cough still present - needs follow-up</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">New</Badge>
                        <span className="text-sm text-gray-900 dark:text-gray-300">Added Lisinopril for BP management</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Vital Signs History</CardTitle>
                  <CardDescription className="dark:text-gray-400">Track patient's vital signs over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="dark:border-gray-700">
                          <TableHead className="text-left">Date</TableHead>
                          <TableHead className="text-left">Blood Pressure</TableHead>
                          <TableHead className="text-left">Heart Rate</TableHead>
                          <TableHead className="text-left">Temperature</TableHead>
                          <TableHead className="text-left">Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockVitals.map((vital, index) => (
                          <TableRow key={index} className="dark:border-gray-700">
                            <TableCell className="dark:text-gray-300">{new Date(vital.date).toLocaleDateString()}</TableCell>
                            <TableCell className="dark:text-gray-300">{vital.bp}</TableCell>
                            <TableCell className="dark:text-gray-300">{vital.hr} bpm</TableCell>
                            <TableCell className="dark:text-gray-300">{vital.temp}</TableCell>
                            <TableCell className="dark:text-gray-300">{vital.weight}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Clinical Notes</CardTitle>
                  <CardDescription className="dark:text-gray-400">Long-term patient memory and clinical observations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Pinned Note</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Patient has good medication compliance. Prefers morning appointments. 
                      History of medication allergies to penicillin.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-400">Treatment Plan</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
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
