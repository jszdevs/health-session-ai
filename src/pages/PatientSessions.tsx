
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Play, 
  Pause, 
  Send, 
  Edit3, 
  Copy, 
  Pin, 
  ArrowLeft,
  Mic,
  Volume2
} from "lucide-react";

const PatientSessions = () => {
  const { patientId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("Patient presents with chest pain that started this morning. Pain is described as sharp, 7/10 intensity, radiating to left arm. No shortness of breath. Patient has history of hypertension, currently on lisinopril 10mg daily. No known allergies.");
  const [aiOutput, setAiOutput] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  const mockPatient = {
    id: patientId,
    name: "Ali Rehman",
    age: 45,
    gender: "Male",
    condition: "Diabetes",
    avatar: "AR"
  };

  const generateAIOutput = () => {
    const mockOutput = {
      chiefComplaint: "Chest pain",
      hpi: "45-year-old male presents with acute onset chest pain this morning. Pain is sharp, 7/10 severity, radiating to left arm. Denies shortness of breath, nausea, or diaphoresis.",
      pmh: "Hypertension",
      medications: "Lisinopril 10mg daily",
      allergies: "NKDA",
      assessment: "Chest pain, rule out acute coronary syndrome vs musculoskeletal",
      plan: "1. EKG 2. Cardiac enzymes 3. Chest X-ray 4. Consider cardiology consult if abnormal findings"
    };
    
    setAiOutput(JSON.stringify(mockOutput, null, 2));
  };

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
                <div className="w-10 h-10 bg-[#1976D2] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{mockPatient.avatar}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{mockPatient.name}</h1>
                  <p className="text-sm text-gray-600">{mockPatient.age} years • {mockPatient.gender} • {mockPatient.condition}</p>
                </div>
              </div>
              <Badge variant="secondary">Session #{new Date().getTime().toString().slice(-4)}</Badge>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Voice Recording Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <span>Voice Recording</span>
              </CardTitle>
              <CardDescription>
                Click to start/stop recording your consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  size="lg"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-[#1976D2] hover:bg-[#1565C0]"
                  } transition-colors`}
                >
                  {isRecording ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                {isRecording && (
                  <div className="flex items-center space-x-2 text-red-500">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording...</span>
                  </div>
                )}
              </div>
              
              {/* Mock Audio Player */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-[#1976D2] rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">02:34 / 08:12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcription Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Session Transcription</CardTitle>
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              <CardDescription>
                AI-generated transcription of your consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="min-h-[120px] resize-none"
                placeholder="Transcription will appear here..."
              />
            </CardContent>
          </Card>

          {/* AI Analysis Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Analysis & Summary</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isPinned}
                      onCheckedChange={setIsPinned}
                    />
                    <Pin className="h-4 w-4" />
                    <span className="text-sm">Pin to Memory</span>
                  </div>
                  <Button onClick={generateAIOutput} className="bg-[#1976D2] hover:bg-[#1565C0]">
                    <Send className="h-4 w-4 mr-2" />
                    Send to GPT
                  </Button>
                </div>
              </div>
              <CardDescription>
                Structured medical note generated by GPT-4o
              </CardDescription>
            </CardHeader>
            <CardContent>
              {aiOutput ? (
                <div className="space-y-4">
                  <Textarea
                    value={aiOutput}
                    onChange={(e) => setAiOutput(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Output
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>Click "Send to GPT" to generate AI analysis</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags and Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Session Tags & Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-[#81C784] text-white">Follow-up Required</Badge>
                <Badge className="bg-[#FFB74D] text-white">Lab Review Needed</Badge>
                <Badge variant="secondary">Cardiology Consult</Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button asChild>
                  <Link to={`/sessions/${new Date().getTime()}/messages`}>
                    View Session Messages
                  </Link>
                </Button>
                <Button variant="outline">
                  Export Notes
                </Button>
                <Button variant="outline">
                  Schedule Follow-up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientSessions;
