
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProblemModal = ({ isOpen, onClose }: CreateProblemModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    difficulty: '',
    category: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    timeLimit: '1',
    memoryLimit: '256'
  });
  
  const [testCases, setTestCases] = useState([
    { input: '', expectedOutput: '', isHidden: false }
  ]);
  
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTestCase = () => {
    setTestCases(prev => [...prev, { input: '', expectedOutput: '', isHidden: false }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(prev => prev.filter((_, i) => i !== index));
  };

  const updateTestCase = (index: number, field: string, value: string | boolean) => {
    setTestCases(prev => prev.map((tc, i) => 
      i === index ? { ...tc, [field]: value } : tc
    ));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.difficulty || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Mock submission
    toast({
      title: "Problem Created",
      description: `"${formData.title}" has been successfully created.`,
    });
    
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      difficulty: '',
      category: '',
      description: '',
      inputFormat: '',
      outputFormat: '',
      constraints: '',
      sampleInput: '',
      sampleOutput: '',
      timeLimit: '1',
      memoryLimit: '256'
    });
    setTestCases([{ input: '', expectedOutput: '', isHidden: false }]);
    setTags([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Problem</DialogTitle>
          <DialogDescription>
            Add a new coding problem to the platform
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Problem Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Two Sum"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Array, String, Tree"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => handleInputChange('timeLimit', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
                  <Input
                    id="memoryLimit"
                    type="number"
                    value={formData.memoryLimit}
                    onChange={(e) => handleInputChange('memoryLimit', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={6}
                  placeholder="Describe the problem statement in detail..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inputFormat">Input Format</Label>
                  <Textarea
                    id="inputFormat"
                    rows={3}
                    placeholder="Describe the input format..."
                    value={formData.inputFormat}
                    onChange={(e) => handleInputChange('inputFormat', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outputFormat">Output Format</Label>
                  <Textarea
                    id="outputFormat"
                    rows={3}
                    placeholder="Describe the expected output format..."
                    value={formData.outputFormat}
                    onChange={(e) => handleInputChange('outputFormat', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="constraints">Constraints</Label>
                <Textarea
                  id="constraints"
                  rows={3}
                  placeholder="List the constraints (e.g., 1 <= n <= 10^5)..."
                  value={formData.constraints}
                  onChange={(e) => handleInputChange('constraints', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sample Input/Output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample Input/Output</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sampleInput">Sample Input</Label>
                  <Textarea
                    id="sampleInput"
                    rows={4}
                    placeholder="Provide sample input..."
                    value={formData.sampleInput}
                    onChange={(e) => handleInputChange('sampleInput', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sampleOutput">Sample Output</Label>
                  <Textarea
                    id="sampleOutput"
                    rows={4}
                    placeholder="Provide expected output..."
                    value={formData.sampleOutput}
                    onChange={(e) => handleInputChange('sampleOutput', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Cases */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Test Cases</CardTitle>
                <Button type="button" variant="outline" onClick={addTestCase}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Test Case {index + 1}</h4>
                    {testCases.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTestCase(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Input</Label>
                      <Textarea
                        rows={3}
                        placeholder="Test case input..."
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Output</Label>
                      <Textarea
                        rows={3}
                        placeholder="Expected output..."
                        value={testCase.expectedOutput}
                        onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Problem
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProblemModal;
