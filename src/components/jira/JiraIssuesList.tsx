
import React, { useState, useEffect } from "react";
import { jiraService, JiraIssue } from "@/services/JiraService";
import { demoJiraService } from "@/services/DemoJiraService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Calendar, Clock, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const JiraIssuesList = () => {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  const isDemoMode = localStorage.getItem('is_demo_mode') === 'true';

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    setIsLoading(true);
    try {
      // Use demo service if in demo mode, otherwise use the real service
      if (isDemoMode) {
        const dummyIssues = await demoJiraService.getAssignedIssues();
        setIssues(dummyIssues);
      } else if (user) {
        const assignedIssues = await jiraService.getAssignedIssues();
        setIssues(assignedIssues);
      } else {
        toast({
          title: "Authentication required",
          description: "Please log in with your Jira account to view issues.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error loading issues:", error);
      toast({
        title: "Failed to load issues",
        description: "There was a problem loading your Jira issues. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredIssues = () => {
    switch (activeTab) {
      case "inProgress":
        return issues.filter(
          (issue) => issue.fields.status.name.toLowerCase().includes("progress")
        );
      case "todo":
        return issues.filter(
          (issue) => issue.fields.status.name.toLowerCase().includes("to do") || 
                     issue.fields.status.name.toLowerCase().includes("backlog")
        );
      case "done":
        return issues.filter(
          (issue) => issue.fields.status.name.toLowerCase().includes("done")
        );
      default:
        return issues;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("progress")) return "bg-blue-500";
    if (statusLower.includes("review")) return "bg-amber-500";
    if (statusLower.includes("done")) return "bg-green-500";
    if (statusLower.includes("to do") || statusLower.includes("backlog")) return "bg-gray-500";
    return "bg-purple-500";
  };

  const getPriorityIcon = (priority: string | undefined) => {
    if (!priority) return "❓";
    const priorityLower = priority.toLowerCase();
    if (priorityLower.includes("highest")) return "🔴";
    if (priorityLower.includes("high")) return "🟠";
    if (priorityLower.includes("medium")) return "🟡";
    if (priorityLower.includes("low")) return "🟢";
    return "⚪";
  };

  const handleLogTime = (issue: JiraIssue) => {
    toast({
      title: "Time logged",
      description: `You've logged time for ${issue.key}: ${issue.fields.summary}`,
    });
  };

  const handleViewDetails = (issue: JiraIssue) => {
    toast({
      title: "View issue details",
      description: `Viewing details for ${issue.key}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Jira Issues</CardTitle>
            <CardDescription>
              View and manage your assigned Jira issues
            </CardDescription>
          </div>
          {isDemoMode && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Demo Mode
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredIssues().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No issues found in this category
              </div>
            ) : (
              <div className="space-y-4">
                {filteredIssues().map((issue) => (
                  <Card key={issue.id} className="overflow-hidden">
                    <div className="flex items-center p-4 border-b">
                      <div className="mr-3">
                        <img
                          src={issue.fields.issuetype.iconUrl}
                          alt={issue.fields.issuetype.name}
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-blue-600">
                            {issue.key}
                          </span>
                          <span className="mx-2">·</span>
                          <span className="text-sm">
                            {getPriorityIcon(issue.fields.priority?.name)}
                          </span>
                        </div>
                        <h3 className="font-medium mt-1">{issue.fields.summary}</h3>
                      </div>
                      <Badge className={`${getStatusColor(issue.fields.status.name)}`}>
                        {issue.fields.status.name}
                      </Badge>
                    </div>

                    <CardContent className="p-4 pt-3">
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {issue.fields.duedate && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Due: {new Date(issue.fields.duedate).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Updated {formatDistanceToNow(new Date(issue.fields.updated), { addSuffix: true })}</span>
                        </div>
                        {issue.fields.comment && (
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{issue.fields.comment.comments.length} comments</span>
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleLogTime(issue)}
                      >
                        Log Time
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleViewDetails(issue)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={loadIssues} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            "Refresh Issues"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JiraIssuesList;
