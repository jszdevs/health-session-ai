
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, RefreshCw, Edit3, MessageSquare, Bot } from "lucide-react";

const SessionMessages = () => {
  const { sessionId } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const mockMessages = [
    {
      id: "1",
      type: "doctor",
      content: "Patient presents with chest pain that started this morning. Pain is described as sharp, 7/10 intensity, radiating to left arm. No shortness of breath. Patient has history of hypertension, currently on lisinopril 10mg daily.",
      timestamp: "10:15 AM",
      edited: false
    },
    {
      id: "2", 
      type: "assistant",
      content: "Based on your clinical description, here's the structured assessment:\n\n**Chief Complaint:** Chest pain\n\n**HPI:** 45-year-old male with acute onset sharp chest pain (7/10), radiating to left arm, started this morning. Denies SOB.\n\n**PMH:** Hypertension\n\n**Medications:** Lisinopril 10mg daily\n\n**Assessment:** Chest pain - need to rule out ACS vs musculoskeletal\n\n**Recommendations:**\n1. Obtain EKG immediately\n2. Cardiac enzymes (troponin)\n3. Chest X-ray\n4. Consider cardiology consult if abnormal",
      timestamp: "10:16 AM",
      edited: false
    },
    {
      id: "3",
      type: "doctor", 
      content: "EKG shows normal sinus rhythm, no ST changes. Troponin levels pending. Patient appears comfortable at rest.",
      timestamp: "10:25 AM",
      edited: false
    },
    {
      id: "4",
      type: "assistant",
      content: "Great - normal EKG is reassuring for ruling out STEMI. With pending troponin:\n\n**Updated Assessment:** Chest pain, likely non-cardiac given normal EKG and patient comfort\n\n**Next Steps:**\n1. Await troponin results\n2. If troponin normal, consider musculoskeletal cause\n3. Stress test if high suspicion despite normal initial workup\n4. Discharge planning with follow-up if troponin negative\n\n**Patient Education:** Return for worsening pain, SOB, or new symptoms",
      timestamp: "10:26 AM", 
      edited: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sessions
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Session Messages</h1>
                <p className="text-sm text-gray-600">Session #{sessionId} • Ali Rehman</p>
              </div>
              <Badge className="bg-[#81C784] text-white">Active Session</Badge>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "doctor" ? "justify-end" : "justify-start"}`}
            >
              <Card 
                className={`max-w-3xl ${
                  message.type === "doctor" 
                    ? "bg-[#1976D2] text-white" 
                    : "bg-white border border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "doctor" 
                        ? "bg-white/20" 
                        : "bg-[#E3F2FD]"
                    }`}>
                      {message.type === "doctor" ? (
                        <MessageSquare className={`h-4 w-4 ${message.type === "doctor" ? "text-white" : "text-[#1976D2]"}`} />
                      ) : (
                        <Bot className={`h-4 w-4 ${message.type === "doctor" ? "text-white" : "text-[#1976D2]"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${
                          message.type === "doctor" ? "text-white/90" : "text-gray-600"
                        }`}>
                          {message.type === "doctor" ? "Dr. Smith" : "AI Assistant"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${
                            message.type === "doctor" ? "text-white/70" : "text-gray-500"
                          }`}>
                            {message.timestamp}
                          </span>
                          {message.type === "doctor" && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          )}
                          {message.type === "assistant" && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm whitespace-pre-wrap ${
                        message.type === "doctor" ? "text-white" : "text-gray-900"
                      }`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Add follow-up notes or ask the AI assistant..."
              className="flex-1 min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  handleSendMessage();
                }
              }}
            />
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={handleSendMessage}
                className="bg-[#1976D2] hover:bg-[#1565C0]"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button variant="outline">
                Insert Follow-up
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Ctrl+Enter to send • Use follow-up suggestions for common next steps
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionMessages;
