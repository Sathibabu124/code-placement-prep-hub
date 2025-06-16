
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Users, Trophy, BookOpen, ArrowRight, Monitor, Shield } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const Index = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');

  const openLogin = (type: 'student' | 'admin') => {
    setLoginType(type);
    setLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">CodePrep Platform</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => openLogin('student')}>
                Student Login
              </Button>
              <Button onClick={() => openLogin('admin')}>
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Coding for
            <span className="text-blue-600 block">Placement Success</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive coding platform designed to help students excel in technical interviews 
            and placement drives with real-time code evaluation and progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => openLogin('student')} className="flex items-center">
              Start Practicing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => openLogin('admin')}>
              Admin Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Succeed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Monitor className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Real-time Code Editor</CardTitle>
                <CardDescription>
                  VS Code-like editor with syntax highlighting and multiple language support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Automated Testing</CardTitle>
                <CardDescription>
                  Instant feedback with comprehensive test case validation and scoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Detailed analytics and performance metrics to track your improvement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Placement Resources</CardTitle>
                <CardDescription>
                  Comprehensive library of placement materials and preparation guides
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Secure Execution</CardTitle>
                <CardDescription>
                  Safe, sandboxed code execution environment with time and memory limits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Multiple Languages</CardTitle>
                <CardDescription>
                  Support for Python, Java, C++, JavaScript and more programming languages
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Coding Problems</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Placement Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Code className="h-8 w-8 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold">CodePrep Platform</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students for placement success through comprehensive coding practice
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 CodePrep Platform. Built with modern web technologies.
            </p>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={loginModal} 
        onClose={() => setLoginModal(false)} 
        type={loginType}
      />
    </div>
  );
};

export default Index;
