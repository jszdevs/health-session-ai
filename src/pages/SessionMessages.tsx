
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, RefreshCw, Edit3, MessageSquare, Bot } from "lucide-react";
import { useSessionMessages } from "@/hooks/useSessionMessages";
import { useToast } from "@/hooks/use-toast";

const SessionMessages = () => {
  const { sessionId } = useParams();
  const { messages, loading, createMessage } = useSessionMessages(sessionId);
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !sessionId) return;
    
    try {
      await createMessage({
        session_id: sessionId,
        message: newMessage,
        sender: 'user'
      });
      
      setNewMessage("");
      
      // Simulate AI response
      setTimeout(async () => {
        await createMessage({
          session_id: sessionId,
          message: generateAIResponse(newMessage),
          sender: 'assistant'
        });
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "Based on your clinical description, here's my assessment:\n\n**Chief Complaint:** Patient presents with the described symptoms\n\n**Recommendations:**\n1. Consider further diagnostic testing\n2. Monitor vital signs\n3. Follow up in 24-48 hours\n\n**Next Steps:** Please provide additional details about the patient's medical history.",
      "Thank you for the additional information. This helps clarify the clinical picture:\n\n**Updated Assessment:** The symptoms suggest we should consider differential diagnoses\n\n**Suggested Actions:**\n1. Order relevant lab work\n2. Consider imaging if indicated\n3. Review medication list\n\n**Patient Education:** Discuss warning signs to watch for",
      "I understand your concern. Let me provide a structured analysis:\n\n**Clinical Reasoning:** The presentation is consistent with several possibilities\n\n**Immediate Actions:**\n1. Assess vital stability\n2. Pain management if appropriate\n3. Consider specialist referral\n\n**Documentation:** Make sure to document the timeline and severity"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1976D2]"></div>
        </div>
      </div>
    );
  }

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
                <p className="text-sm text-gray-600">Session #{sessionId?.slice(-8)} • AI Assistant</p>
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card 
                className={`max-w-3xl ${
                  message.sender === "user" 
                    ? "bg-[#1976D2] text-white" 
                    : "bg-white border border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-white/20" 
                        : "bg-[#E3F2FD]"
                    }`}>
                      {message.sender === "user" ? (
                        <MessageSquare className={`h-4 w-4 ${message.sender === "user" ? "text-white" : "text-[#1976D2]"}`} />
                      ) : (
                        <Bot className={`h-4 w-4 ${message.sender === "user" ? "text-white" : "text-[#1976D2]"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${
                          message.sender === "user" ? "text-white/90" : "text-gray-600"
                        }`}>
                          {message.sender === "user" ? "You" : "AI Assistant"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${
                            message.sender === "user" ? "text-white/70" : "text-gray-500"
                          }`}>
                            {new Date(message.created_at!).toLocaleTimeString()}
                          </span>
                          {message.sender === "user" && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          )}
                          {message.sender === "assistant" && (
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
                        message.sender === "user" ? "text-white" : "text-gray-900"
                      }`}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          )}
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
