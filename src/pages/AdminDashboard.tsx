
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Users, 
  BookOpen, 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Award,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateProblemModal from "@/components/admin/CreateProblemModal";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [createProblemModal, setCreateProblemModal] = useState(false);
  const navigate = useNavigate();

  const stats = {
    totalStudents: 245,
    totalProblems: 156,
    totalSubmissions: 3420,
    averageScore: 78,
    activeUsers: 45,
    documentsUploaded: 24
  };

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      submissions: 342,
      acceptance: 85,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Easy",
      category: "Linked List",
      submissions: 218,
      acceptance: 78,
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Binary Tree Traversal",
      difficulty: "Medium",
      category: "Tree",
      submissions: 156,
      acceptance: 67,
      createdAt: "2024-01-13"
    },
    {
      id: 4,
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      category: "Linked List",
      submissions: 89,
      acceptance: 32,
      createdAt: "2024-01-12"
    }
  ];

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      rollNumber: "CS2021001",
      department: "Computer Science",
      year: 3,
      problemsSolved: 45,
      rank: 1,
      lastActive: "2024-01-16"
    },
    {
      id: 2,
      name: "Bob Smith",
      rollNumber: "CS2021002",
      department: "Computer Science",
      year: 3,
      problemsSolved: 38,
      rank: 2,
      lastActive: "2024-01-16"
    },
    {
      id: 3,
      name: "Carol Williams",
      rollNumber: "IT2021001",
      department: "Information Technology",
      year: 2,
      problemsSolved: 29,
      rank: 3,
      lastActive: "2024-01-15"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Admin!</span>
              <Button variant="outline" onClick={() => navigate('/')}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problems Created</CardTitle>
              <Code className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProblems}</div>
              <p className="text-xs text-muted-foreground">+8 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">+24% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">+3% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList>
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Problems Tab */}
          <TabsContent value="problems">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Problem Management</CardTitle>
                    <CardDescription>
                      Create, edit, and manage coding problems for students
                    </CardDescription>
                  </div>
                  <Button onClick={() => setCreateProblemModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Problem
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search problems..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {problem.title}
                          </h3>
                          <p className="text-sm text-gray-500">{problem.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                        <div className="text-sm text-gray-500 hidden sm:block">
                          {problem.submissions} submissions
                        </div>
                        <div className="text-sm text-gray-500 hidden md:block">
                          {problem.acceptance}% acceptance
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  View and manage student accounts and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {student.rollNumber} • {student.department} • Year {student.year}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500 hidden sm:block">
                          Rank #{student.rank}
                        </div>
                        <div className="text-sm text-gray-500 hidden md:block">
                          {student.problemsSolved} solved
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {student.lastActive}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Performance metrics visualization
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Document Management</CardTitle>
                    <CardDescription>
                      Upload and manage placement resources and study materials
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Upload study materials and placement resources for students</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CreateProblemModal 
        isOpen={createProblemModal}
        onClose={() => setCreateProblemModal(false)}
      />
    </div>
  );
};

export default AdminDashboard;
