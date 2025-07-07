
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit3, Copy, Trash2, Search } from "lucide-react";

const PromptsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    body: "",
    tags: []
  });

  const mockPrompts = [
    {
      id: "1",
      title: "Extract SOAP Note",
      body: "From the following medical consultation transcript, extract and organize the information into a structured SOAP note format:\n\nSubjective: [Patient's chief complaint and history]\nObjective: [Physical examination findings and vital signs]\nAssessment: [Clinical impression and diagnosis]\nPlan: [Treatment plan and follow-up instructions]\n\nTranscript: {transcript}",
      tags: ["SOAP", "Documentation", "Primary"],
      usageCount: 45,
      lastUsed: "2024-01-15"
    },
    {
      id: "2", 
      title: "Identify Red Flags",
      body: "Analyze the following patient consultation for any red flag symptoms or concerning findings that require immediate attention or further investigation. Highlight:\n\n1. Critical symptoms requiring urgent care\n2. Signs suggesting serious underlying conditions\n3. Risk factors for complications\n4. Recommended immediate actions\n\nConsultation: {transcript}",
      tags: ["Emergency", "Triage", "Safety"],
      usageCount: 23,
      lastUsed: "2024-01-14"
    },
    {
      id: "3",
      title: "Summarize Lab Results",
      body: "Review and summarize the following laboratory results, highlighting:\n\n1. Abnormal values and their clinical significance\n2. Trends compared to previous results (if available)\n3. Clinical correlations with patient symptoms\n4. Recommended follow-up actions\n\nLab Results: {lab_data}\nPatient Context: {patient_history}",
      tags: ["Labs", "Interpretation", "Follow-up"],
      usageCount: 67,
      lastUsed: "2024-01-13"
    },
    {
      id: "4",
      title: "Generate Differential Diagnosis",
      body: "Based on the patient presentation below, generate a comprehensive differential diagnosis list with:\n\n1. Most likely diagnoses (top 3)\n2. Must-not-miss diagnoses\n3. Less likely but possible conditions\n4. Recommended tests to differentiate\n\nFor each diagnosis, provide brief reasoning based on the clinical presentation.\n\nPatient Presentation: {transcript}",
      tags: ["Diagnosis", "Clinical Reasoning", "Education"],
      usageCount: 34,
      lastUsed: "2024-01-12"
    }
  ];

  const filteredPrompts = mockPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreatePrompt = () => {
    console.log("Creating prompt:", newPrompt);
    setIsDialogOpen(false);
    setNewPrompt({ title: "", body: "", tags: [] });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prompt Templates</h1>
              <p className="text-gray-600">Manage your reusable AI prompt templates</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search prompts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1976D2] hover:bg-[#1565C0]">
                    <Plus className="h-4 w-4 mr-2" />
                    New Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Prompt</DialogTitle>
                    <DialogDescription>
                      Create a reusable prompt template for AI analysis
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Prompt Title</Label>
                      <Input
                        id="title"
                        value={newPrompt.title}
                        onChange={(e) => setNewPrompt({...newPrompt, title: e.target.value})}
                        placeholder="Enter prompt title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="body">Prompt Body</Label>
                      <Textarea
                        id="body"
                        value={newPrompt.body}
                        onChange={(e) => setNewPrompt({...newPrompt, body: e.target.value})}
                        placeholder="Enter your prompt template..."
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePrompt} className="bg-[#1976D2] hover:bg-[#1565C0]">
                        Create Prompt
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                      <CardDescription>
                        Used {prompt.usageCount} times • Last used {new Date(prompt.lastUsed).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 line-clamp-4">{prompt.body}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag, index) => (
                      <Badge 
                        key={index}
                        className={
                          tag === "Primary" ? "bg-[#1976D2] text-white" :
                          tag === "Emergency" ? "bg-red-500 text-white" :
                          tag === "Follow-up" ? "bg-[#81C784] text-white" :
                          tag === "Labs" ? "bg-[#FFB74D] text-white" :
                          "bg-gray-200 text-gray-700"
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="bg-[#1976D2] hover:bg-[#1565C0]">
                      Use Template
                    </Button>
                    <Button size="sm" variant="outline">
                      Duplicate
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

export default PromptsManager;
