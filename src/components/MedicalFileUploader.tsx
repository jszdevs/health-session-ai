
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MedicalFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  extractedData?: {
    summary: string;
    keyFindings: string[];
    recommendations: string[];
  };
}

interface MedicalFileUploaderProps {
  patientId: string;
  onFileProcessed?: (file: MedicalFile) => void;
}

const MedicalFileUploader = ({ patientId, onFileProcessed }: MedicalFileUploaderProps) => {
  const [files, setFiles] = useState<MedicalFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const mockExtractedData = {
    summary: "MRI brain scan shows normal cerebral structures with no acute abnormalities. Mild age-related changes noted in white matter.",
    keyFindings: [
      "No acute intracranial pathology",
      "Mild white matter hyperintensities",
      "Normal ventricular size",
      "No mass effect or midline shift"
    ],
    recommendations: [
      "Continue current treatment plan",
      "Follow-up in 6 months if symptoms persist",
      "Consider neurology consultation if headaches worsen"
    ]
  };

  const handleFileUpload = (uploadedFiles: FileList) => {
    Array.from(uploadedFiles).forEach((file) => {
      if (file.type === 'application/pdf' || file.name.toLowerCase().includes('.pdf')) {
        const newFile: MedicalFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toISOString(),
          status: 'processing'
        };

        setFiles(prev => [...prev, newFile]);

        // Simulate AI processing
        setTimeout(() => {
          setFiles(prev => prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'completed', extractedData: mockExtractedData }
              : f
          ));
          
          const processedFile = { ...newFile, status: 'completed' as const, extractedData: mockExtractedData };
          onFileProcessed?.(processedFile);
          
          toast({
            title: "File processed successfully",
            description: `${file.name} has been analyzed and key data extracted.`,
          });
        }, 3000);

        toast({
          title: "File uploaded",
          description: `Processing ${file.name}...`,
        });
      } else {
        toast({
          title: "Unsupported file type",
          description: "Please upload PDF files only.",
          variant: "destructive",
        });
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "File deleted",
      description: "Medical file removed from session.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-base md:text-lg dark:text-white flex items-center space-x-2">
          <FileText className="h-4 w-4 md:h-5 md:w-5" />
          <span>AI Medical File Parser</span>
        </CardTitle>
        <CardDescription className="dark:text-gray-400">
          Upload MRI reports, lab results, or other medical documents for AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-[#1976D2] bg-blue-50 dark:bg-blue-950/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-[#1976D2] dark:hover:border-[#1976D2]'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Drag and drop PDF files here, or click to browse
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Supports: MRI reports, Lab results, X-rays, CT scans (PDF format)
          </p>
          <Input
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            id="file-upload"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Uploaded Files</h4>
            {files.map((file) => (
              <div key={file.id} className="border dark:border-gray-600 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm dark:text-white">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'processing' && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Processing</span>
                      </Badge>
                    )}
                    {file.status === 'completed' && (
                      <Badge variant="default" className="bg-green-600 flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Processed</span>
                      </Badge>
                    )}
                    {file.status === 'error' && (
                      <Badge variant="destructive" className="flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Error</span>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Extracted Data */}
                {file.status === 'completed' && file.extractedData && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                    <h5 className="font-medium text-sm dark:text-white">AI Analysis Results:</h5>
                    
                    <div>
                      <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Summary:</h6>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{file.extractedData.summary}</p>
                    </div>
                    
                    <div>
                      <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Key Findings:</h6>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {file.extractedData.keyFindings.map((finding, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span>•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Recommendations:</h6>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {file.extractedData.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span>•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Add to Patient Summary
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalFileUploader;
