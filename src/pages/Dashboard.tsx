
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import JiraConnect from "@/components/jira/JiraConnect";
import JiraIssuesList from "@/components/jira/JiraIssuesList";
import TimeLogsList from "@/components/jira/TimeLogsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, GitBranch, CalendarDays } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isJiraConnected, setIsJiraConnected] = useState(false);
  const isDemoMode = localStorage.getItem('is_demo_mode') === 'true';

  useEffect(() => {
    // Check if user is logged in, unless we're in demo mode
    if (!loading && !user && !isDemoMode) {
      navigate('/login');
    }
    
    // Check if user is connected to Jira or we're in demo mode
    if ((user?.app_metadata?.provider === 'atlassian') || isDemoMode) {
      setIsJiraConnected(true);
    }
  }, [user, loading, navigate]);

  // For demo purposes, let's create a mock user if we're in demo mode
  const demoUser = isDemoMode ? JSON.parse(localStorage.getItem('demo_user') || '{}') : null;
  const displayUser = isDemoMode ? demoUser : user;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <Container>
          <div className="flex flex-col gap-8">
            <FadeIn>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Track your time and manage your tasks
                  </p>
                </div>
                {isDemoMode && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 px-3 py-1">
                    Demo Mode - Sample Data
                  </Badge>
                )}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {isJiraConnected ? (
                  <>
                    <FadeIn delay={100}>
                      <JiraIssuesList />
                    </FadeIn>
                    <FadeIn delay={200}>
                      <TimeLogsList />
                    </FadeIn>
                  </>
                ) : (
                  <FadeIn delay={100}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Getting Started</CardTitle>
                        <CardDescription>
                          Connect your services to start automating your time tracking.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Connect to Jira</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Link your Jira account to import tasks and time logs.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center flex-shrink-0">
                              <GitBranch className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Connect to BitBucket/GitHub</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Link your Git repository to pull commit information.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center flex-shrink-0">
                              <CalendarDays className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Connect to Calendar</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Link your calendar to import meetings and events.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )}
              </div>

              <div className="space-y-6">
                <FadeIn delay={300}>
                  <Tabs defaultValue="jira" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="jira">Jira</TabsTrigger>
                      <TabsTrigger value="git">Git</TabsTrigger>
                      <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="jira">
                      {isJiraConnected ? (
                        <Card>
                          <CardHeader>
                            <CardTitle>Jira Connected</CardTitle>
                            <CardDescription>
                              Your Jira account is connected successfully.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-center py-4">
                              <div className="text-center">
                                <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <p className="font-medium">Connected as {displayUser?.user_metadata?.name || displayUser?.email || "Demo User"}</p>
                                {isDemoMode && (
                                  <p className="text-xs text-amber-600 mt-2">
                                    Using demo data for demonstration purposes
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <JiraConnect />
                      )}
                    </TabsContent>
                    <TabsContent value="git">
                      <Card>
                        <CardHeader>
                          <CardTitle>Connect to Git</CardTitle>
                          <CardDescription>
                            Link your BitBucket or GitHub repository.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center py-6 text-center text-gray-500 dark:text-gray-400">
                            <p>Coming soon</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="calendar">
                      <Card>
                        <CardHeader>
                          <CardTitle>Connect to Calendar</CardTitle>
                          <CardDescription>
                            Link your Google or Outlook calendar.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center py-6 text-center text-gray-500 dark:text-gray-400">
                            <p>Coming soon</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </FadeIn>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
