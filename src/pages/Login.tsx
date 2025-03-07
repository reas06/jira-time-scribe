
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJiraLogin = async () => {
    setIsLoading(true);
    try {
      // For demo purposes, let's simulate a successful login
      // In production, we would use the real Atlassian OAuth flow
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'atlassian' as any, // Type cast to fix TS error
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'read:jira-user read:jira-work write:jira-work manage:jira-webhook manage:jira-data-provider',
        },
      });
      
      if (error) throw error;
      
      // Demo mode: If you want to skip the actual OAuth flow and just go to dashboard
      // Uncomment these lines to enable demo mode without actual Jira auth
      /*
      localStorage.setItem('is_demo_mode', 'true');
      toast({
        title: "Demo login successful",
        description: "You are now viewing the demo dashboard.",
      });
      navigate("/dashboard");
      setIsLoading(false);
      */
    } catch (error: any) {
      toast({
        title: "Jira login failed",
        description: error.message || "Failed to login with Jira. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Demo login function without actual OAuth
  const handleDemoLogin = () => {
    setIsLoading(true);
    // Set a flag in localStorage to indicate we're in demo mode
    localStorage.setItem('is_demo_mode', 'true');
    
    toast({
      title: "Demo mode activated",
      description: "You are now viewing the demo dashboard with sample data.",
    });
    
    // Simulate user data
    localStorage.setItem('demo_user', JSON.stringify({
      id: "demo-user-123",
      email: "demo@example.com",
      name: "Demo User",
    }));
    
    setTimeout(() => {
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-24 pb-12 flex items-center">
        <Container className="max-w-md mx-auto">
          <FadeIn>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password or use Jira to login
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="yourname@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in with Email"}
                  </Button>
                </form>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleJiraLogin}
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                      <path d="M7 2h10v20H7z" />
                      <path d="M12 6l-5 5 5 5" />
                    </svg>
                    Sign in with Jira
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="secondary" 
                    className="w-full"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                      <polyline points="7.5 19.79 7.5 14.6 3 12" />
                      <polyline points="21 12 16.5 14.6 16.5 19.79" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    Demo Mode (No Login Required)
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </FadeIn>
        </Container>
      </main>
    </div>
  );
};

export default Login;
