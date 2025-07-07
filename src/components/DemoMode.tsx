
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause, 
  Volume2, 
  Brain, 
  Copy,
  Pin,
  Clock,
  User
} from "lucide-react";

const DemoMode = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showAIOutput, setShowAIOutput] = useState(false);

  const demoSteps = [
    "Starting voice recording...",
    "Transcribing speech...",
    "Processing with GPT-4o...",
    "Generating SOAP note...",
    "Complete!"
  ];

  const mockTranscript = `Patient is a 45-year-old male presenting with chest pain that started 2 hours ago. Pain is described as sharp, 7/10 intensity, radiating to left arm. No shortness of breath. Has history of hypertension, takes lisinopril 10mg daily. No known allergies. Vital signs: BP 145/90, HR 85, RR 16, O2 sat 98% on room air.`;

  const mockAIOutput = {
    chiefComplaint: "Chest pain, 2 hours duration",
    hpi: "45-year-old male with acute onset chest pain, sharp quality, 7/10 severity, radiating to left arm. No associated shortness of breath.",
    pmh: "Hypertension",
    medications: "Lisinopril 10mg daily",
    allergies: "NKDA",
    vitals: "BP 145/90, HR 85, RR 16, O2 sat 98% RA",
    assessment: "Chest pain, rule out acute coronary syndrome",
    plan: "EKG, cardiac enzymes, aspirin 325mg, monitor"
  };

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setShowTranscript(false);
    setShowAIOutput(false);

    // Simulate demo progression
    const intervals = [1000, 2000, 3000, 2000, 1000];
    let totalTime = 0;

    intervals.forEach((interval, index) => {
      totalTime += interval;
      setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === 1) setShowTranscript(true);
        if (index === 3) setShowAIOutput(true);
        if (index === 4) setIsPlaying(false);
      }, totalTime);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Demo Header */}
      <Card className="bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6" />
            <span>MedAssist AI Demo</span>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Experience a complete patient consultation workflow in 30 seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handlePlayDemo}
            disabled={isPlaying}
            className="bg-white text-[#1976D2] hover:bg-gray-100 font-medium"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Demo Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Demo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Demo Patient Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Demo Patient: John Smith</span>
            <Badge variant="outline" className="ml-auto">Age 45</Badge>
          </CardTitle>
          <CardDescription>
            Emergency Department Visit - Chest Pain
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      {isPlaying && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {demoSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 ${
                    index <= currentStep ? 'text-[#1976D2]' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-[#1976D2]' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voice Recording Simulation */}
      {isPlaying && currentStep >= 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-[#1976D2]" />
              <span>Voice Recording</span>
              <div className="flex space-x-1 ml-auto">
                <div className="w-2 h-4 bg-[#1976D2] rounded animate-pulse"></div>
                <div className="w-2 h-6 bg-[#1976D2] rounded animate-pulse delay-100"></div>
                <div className="w-2 h-3 bg-[#1976D2] rounded animate-pulse delay-200"></div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Recording: 0:45</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transcript */}
      {showTranscript && (
        <Card>
          <CardHeader>
            <CardTitle>Live Transcript</CardTitle>
            <CardDescription>Real-time speech-to-text conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">{mockTranscript}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Output */}
      {showAIOutput && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-[#1976D2]" />
              <span>AI-Generated SOAP Note</span>
            </CardTitle>
            <CardDescription>Structured medical documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Chief Complaint</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">{mockAIOutput.chiefComplaint}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Vital Signs</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">{mockAIOutput.vitals}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">History of Present Illness</h4>
              <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">{mockAIOutput.hpi}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">PMH</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">{mockAIOutput.pmh}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Medications</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">{mockAIOutput.medications}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Allergies</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">{mockAIOutput.allergies}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Assessment & Plan</h4>
              <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">{mockAIOutput.assessment}</p>
              <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded mt-2">{mockAIOutput.plan}</p>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="outline">
                <Pin className="h-4 w-4 mr-1" />
                Pin to Memory
              </Button>
              <Badge className="medical-badge-urgent">Urgent</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DemoMode;
