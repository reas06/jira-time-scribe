
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { demoJiraService } from "@/services/DemoJiraService";
import { toast } from "@/components/ui/use-toast";

interface TimeLog {
  id: string;
  issueKey: string;
  issueSummary: string;
  date: string;
  timeSpent: number; // in minutes
  description: string;
}

const TimeLogsList = () => {
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isDemoMode = localStorage.getItem('is_demo_mode') === 'true';

  useEffect(() => {
    loadTimeLogs();
  }, []);

  const loadTimeLogs = async () => {
    setIsLoading(true);
    try {
      // Always use demo data for this component
      const timeData = await demoJiraService.getTimeLogData();
      // Type assertion to ensure the returned data matches our TimeLog[] type
      setLogs(timeData as TimeLog[]);
    } catch (error) {
      console.error("Error loading time logs:", error);
      toast({
        title: "Failed to load time logs",
        description: "There was a problem loading your time tracking data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Time Logs</CardTitle>
            <CardDescription>
              Your recent time tracking activity
            </CardDescription>
          </div>
          {isDemoMode && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Demo Data
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No time logs found
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm font-medium">
                    {formatTime(log.timeSpent)}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-600 mr-2">
                      {log.issueKey}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(log.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium mt-1">{log.issueSummary}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {log.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={loadTimeLogs} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Refresh Time Logs"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimeLogsList;
