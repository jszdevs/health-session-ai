
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MedicalFileUploader from "@/components/MedicalFileUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  Send, 
  Edit3, 
  Copy, 
  Pin, 
  ArrowLeft,
  Mic,
  Volume2,
  Plus
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSessions } from "@/hooks/useSessions";
import { useToast } from "@/hooks/use-toast";

const PatientSessions = () => {
  const { patientId } = useParams();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { sessions, loading, createSession, updateSession } = useSessions(patientId);
  const { toast } = useToast();
  
  const [isRecording, setIsRecording] = useState(false);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [transcription, setTranscription] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [patient, setPatient] = useState<any>(null);

  // Load patient data
  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) return;
      
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single();
      
      if (error) {
        console.error('Error fetching patient:', error);
      } else {
        setPatient(data);
      }
    };
    
    fetchPatient();
  }, [patientId]);

  // Set current session when sessions load
  useEffect(() => {
    if (sessions.length > 0 && !currentSession) {
      const latest = sessions[0];
      setCurrentSession(latest);
      setTranscription(latest.notes || "");
      setAiOutput(latest.summary || "");
      setIsPinned(false);
    }
  }, [sessions, currentSession]);

  const createNewSession = async () => {
    if (!patientId || !patient) return;
    
    try {
      const newSession = await createSession({
        patient_id: patientId,
        title: `Session ${new Date().toLocaleDateString()}`,
        notes: "Patient presents with chest pain that started this morning. Pain is described as sharp, 7/10 intensity, radiating to left arm. No shortness of breath. Patient has history of hypertension, currently on lisinopril 10mg daily. No known allergies.",
        summary: "",
        session_type: 'consultation',
        status: 'active'
      });

      if (newSession) {
        setCurrentSession(newSession);
        setTranscription(newSession.notes || "");
        setAiOutput("");
        setIsPinned(false);
        toast({ title: "New session created!" });
      }
    } catch (error) {
      toast({
        title: "Error creating session",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveCurrentSession = async () => {
    if (!currentSession) return;
    
    try {
      await updateSession(currentSession.id, {
        notes: transcription,
        summary: aiOutput,
        status: 'completed'
      });
      
      toast({ title: "Session saved successfully!" });
    } catch (error) {
      toast({
        title: "Error saving session",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateAIOutput = () => {
    const mockOutput = {
      chiefComplaint: "Chest pain",
      hpi: `${patient?.age || 45}-year-old ${patient?.gender?.toLowerCase() || 'male'} presents with acute onset chest pain this morning. Pain is sharp, 7/10 severity, radiating to left arm. Denies shortness of breath, nausea, or diaphoresis.`,
      pmh: patient?.condition || "Hypertension",
      medications: "Lisinopril 10mg daily",
      allergies: "NKDA",
      assessment: "Chest pain, rule out acute coronary syndrome vs musculoskeletal",
      plan: "1. EKG 2. Cardiac enzymes 3. Chest X-ray 4. Consider cardiology consult if abnormal findings"
    };
    
    const output = JSON.stringify(mockOutput, null, 2);
    setAiOutput(output);
    toast({ title: "AI analysis generated!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiOutput);
    toast({ title: "Copied to clipboard!" });
  };

  if (loading || !patient) {
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
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1976D2] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm md:text-base font-medium">
                    {patient.avatar || patient.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{patient.name}</h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {patient.age} • {patient.gender} • {patient.condition}
                  </p>
                </div>
              </div>
              {currentSession && (
                <Badge variant="secondary" className="hidden md:inline-flex">
                  Session #{currentSession.id.slice(-4)}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={createNewSession} size="sm" className="bg-[#1976D2] hover:bg-[#1565C0]">
                <Plus className="h-4 w-4 mr-1" />
                New Session
              </Button>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {!currentSession ? (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-2">No Session Started</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Create a new session to begin consultation</p>
                <Button onClick={createNewSession} className="bg-[#1976D2] hover:bg-[#1565C0]">
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Voice Recording Card */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg flex items-center space-x-2">
                    <Mic className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Voice Recording</span>
                  </CardTitle>
                  <CardDescription>Click to start/stop recording your consultation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <Button
                      size={isMobile ? "default" : "lg"}
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-full md:w-auto ${
                        isRecording 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-[#1976D2] hover:bg-[#1565C0]"
                      } transition-colors`}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>
                    {isRecording && (
                      <div className="flex items-center space-x-2 text-red-500">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Recording...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Mock Audio Player */}
                  <div className="mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                          <div className="h-2 bg-[#1976D2] rounded-full w-1/3"></div>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">02:34 / 08:12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical File Parser */}
              <MedicalFileUploader 
                patientId={patientId!}
                onFileProcessed={(file) => {
                  console.log("File processed:", file);
                }}
              />

              {/* Transcription Card */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <CardTitle className="text-base md:text-lg dark:text-white">Session Transcription</CardTitle>
                    <Button variant="outline" size="sm" onClick={saveCurrentSession}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  <CardDescription className="dark:text-gray-400">
                    AI-generated transcription of your consultation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                    className="min-h-[100px] md:min-h-[120px] resize-none dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Transcription will appear here..."
                  />
                </CardContent>
              </Card>

              {/* AI Analysis Card */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-base md:text-lg dark:text-white">AI Analysis & Summary</CardTitle>
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={isPinned}
                          onCheckedChange={setIsPinned}
                        />
                        <Pin className="h-4 w-4" />
                        <span className="text-sm">Pin to Memory</span>
                      </div>
                      <Button onClick={generateAIOutput} size="sm" className="bg-[#1976D2] hover:bg-[#1565C0] w-full md:w-auto">
                        <Send className="h-4 w-4 mr-2" />
                        Generate AI Analysis
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="dark:text-gray-400">
                    Structured medical note generated by GPT-4o
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {aiOutput ? (
                    <div className="space-y-4">
                      <Textarea
                        value={aiOutput}
                        onChange={(e) => setAiOutput(e.target.value)}
                        className="min-h-[150px] md:min-h-[200px] font-mono text-xs md:text-sm dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full md:w-auto">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy to Clipboard
                        </Button>
                        <Button variant="outline" size="sm" onClick={saveCurrentSession} className="w-full md:w-auto">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 md:p-8 text-center text-gray-500 dark:text-gray-400">
                      <p>Click "Generate AI Analysis" to create structured medical notes</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Previous Sessions */}
              {sessions.length > 1 && (
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg dark:text-white">Previous Sessions ({sessions.length - 1})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {sessions.filter(s => s.id !== currentSession.id).slice(0, 3).map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <p className="text-sm font-medium dark:text-white">{session.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(session.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setCurrentSession(session);
                              setTranscription(session.notes || "");
                              setAiOutput(session.summary || "");
                              setIsPinned(false);
                            }}
                          >
                            Load
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientSessions;
