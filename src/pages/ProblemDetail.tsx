import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Play, 
  Send, 
  Clock, 
  MemoryStick, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
    // Your code here
    
}`);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  // Mock problem data
  const problem = {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: 85,
    timeLimit: "1s",
    memoryLimit: "256MB",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3], 6", expectedOutput: "[0,1]", isHidden: true }
    ]
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    // Mock running code with sample test cases
    setTimeout(() => {
      const mockResults = [
        { status: "Passed", input: "[2,7,11,15], 9", output: "[0,1]", expected: "[0,1]", time: "12ms" },
        { status: "Passed", input: "[3,2,4], 6", output: "[1,2]", expected: "[1,2]", time: "8ms" }
      ];
      setTestResults(mockResults);
      setIsRunning(false);
      toast({
        title: "Code executed successfully",
        description: "All sample test cases passed!",
      });
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setIsSubmitting(false);
      
      if (success) {
        toast({
          title: "Submission Successful",
          description: "Your solution passed all test cases!",
        });
        navigate('/student/dashboard');
      } else {
        toast({
          title: "Submission Failed",
          description: "Some test cases failed. Please review your solution.",
          variant: "destructive",
        });
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/student/dashboard')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center">
                <Code className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">CodePrep Platform</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {problem.timeLimit}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MemoryStick className="h-4 w-4 mr-1" />
                {problem.memoryLimit}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {problem.title}
                  <span className="text-sm text-gray-500">{problem.acceptance}% acceptance</span>
                </CardTitle>
                <CardDescription>{problem.category} Problem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>
                  
                  <h4 className="font-semibold mt-6 mb-3">Examples:</h4>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="mb-2">
                        <strong>Input:</strong> <code className="bg-gray-200 px-1 rounded">{example.input}</code>
                      </div>
                      <div className="mb-2">
                        <strong>Output:</strong> <code className="bg-gray-200 px-1 rounded">{example.output}</code>
                      </div>
                      <div>
                        <strong>Explanation:</strong> {example.explanation}
                      </div>
                    </div>
                  ))}
                  
                  <h4 className="font-semibold mt-6 mb-3">Constraints:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="text-gray-700">{constraint}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm min-h-[300px] resize-none"
                  placeholder="Write your solution here..."
                />
                
                <div className="flex gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleRun}
                    disabled={isRunning}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {result.status === "Passed" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <div className="text-sm font-medium">Test Case {index + 1}</div>
                            <div className="text-xs text-gray-500">Input: {result.input}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{result.status}</div>
                          <div className="text-xs text-gray-500">{result.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
