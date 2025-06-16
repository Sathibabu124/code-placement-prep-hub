
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Trophy, 
  Clock, 
  Search, 
  Filter,
  CheckCircle,
  Circle,
  Star,
  BookOpen,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const navigate = useNavigate();

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      solved: true,
      acceptance: 85,
      timeLimit: "1s",
      memoryLimit: "256MB"
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Easy",
      category: "Linked List",
      solved: true,
      acceptance: 78,
      timeLimit: "1s",
      memoryLimit: "256MB"
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      solved: false,
      acceptance: 92,
      timeLimit: "1s",
      memoryLimit: "256MB"
    },
    {
      id: 4,
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      category: "Tree",
      solved: false,
      acceptance: 67,
      timeLimit: "1s",
      memoryLimit: "256MB"
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "String",
      solved: false,
      acceptance: 45,
      timeLimit: "2s",
      memoryLimit: "512MB"
    },
    {
      id: 6,
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      category: "Linked List",
      solved: false,
      acceptance: 32,
      timeLimit: "3s",
      memoryLimit: "512MB"
    }
  ];

  const stats = {
    totalSolved: 2,
    totalProblems: problems.length,
    easyCompleted: 2,
    mediumCompleted: 0,
    hardCompleted: 0,
    streak: 3,
    rank: 245
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || 
                             problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">CodePrep Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Student!</span>
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
              <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSolved}/{stats.totalProblems}</div>
              <Progress value={(stats.totalSolved / stats.totalProblems) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Target className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{stats.rank}</div>
              <p className="text-xs text-muted-foreground">Top 15% globally</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Resources available</p>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progress by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.easyCompleted}</div>
                <div className="text-sm text-gray-600">Easy Problems</div>
                <Progress value={66} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.mediumCompleted}</div>
                <div className="text-sm text-gray-600">Medium Problems</div>
                <Progress value={0} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.hardCompleted}</div>
                <div className="text-sm text-gray-600">Hard Problems</div>
                <Progress value={0} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems Section */}
        <Card>
          <CardHeader>
            <CardTitle>Practice Problems</CardTitle>
            <CardDescription>
              Solve coding problems to improve your skills and prepare for placements
            </CardDescription>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedDifficulty === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedDifficulty === "easy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("easy")}
                >
                  Easy
                </Button>
                <Button
                  variant={selectedDifficulty === "medium" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("medium")}
                >
                  Medium
                </Button>
                <Button
                  variant={selectedDifficulty === "hard" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty("hard")}
                >
                  Hard
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProblems.map((problem) => (
                <div
                  key={problem.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/student/problem/${problem.id}`)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {problem.solved ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
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
                      {problem.acceptance}% acceptance
                    </div>
                    <div className="flex items-center text-sm text-gray-500 hidden md:flex">
                      <Clock className="h-4 w-4 mr-1" />
                      {problem.timeLimit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
