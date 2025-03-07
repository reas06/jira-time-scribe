
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, FileDown, FilePdf } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { demoJiraService } from "@/services/DemoJiraService";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  generateTimeLogPdf, 
  filterLogsForCurrentWeek, 
  filterLogsForCurrentMonth,
  TimeLogData 
} from "@/services/PdfService";

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
  const [activeTab, setActiveTab] = useState<"all" | "week" | "month">("all");
  const isDemoMode = localStorage.getItem('is_demo_mode') === 'true';

  useEffect(() => {
    loadTimeLogs();
  }, []);

  const loadTimeLogs = async () => {
    setIsLoading(true);
    try {
      // Always use demo data for this component
      const timeData = await demoJiraService.getTimeLogData();
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

  const getFilteredLogs = () => {
    switch(activeTab) {
      case "week":
        return filterLogsForCurrentWeek(logs);
      case "month":
        return filterLogsForCurrentMonth(logs);
      default:
        return logs;
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | "week" | "month");
  };

  const downloadPdf = (period: 'week' | 'month') => {
    try {
      const filteredLogs = period === 'week' 
        ? filterLogsForCurrentWeek(logs) 
        : filterLogsForCurrentMonth(logs);
      
      if (filteredLogs.length === 0) {
        toast({
          title: "No data to export",
          description: `There are no time logs for the selected ${period}.`,
          variant: "destructive",
        });
        return;
      }
      
      const userName = isDemoMode ? "Demo User" : "User";
      const doc = generateTimeLogPdf(filteredLogs, period, userName);
      
      // Save the PDF with a filename that includes the period and current date
      const fileName = `time-logs-${period}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      doc.save(fileName);
      
      toast({
        title: "PDF Downloaded",
        description: `Your ${period}ly time log report has been downloaded.`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description: "There was a problem generating your PDF report.",
        variant: "destructive",
      });
    }
  };

  const filteredLogs = getFilteredLogs();
  const totalTime = filteredLogs.reduce((total, log) => total + log.timeSpent, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Time Logs</CardTitle>
            <CardDescription>
              {activeTab === "all" ? "All time logs" : 
               activeTab === "week" ? "This week's time logs" : 
               "This month's time logs"}
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
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Time</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => downloadPdf('week')}
                disabled={isLoading}
                className="text-xs"
              >
                <FileDown className="h-3.5 w-3.5 mr-1" />
                Weekly PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => downloadPdf('month')}
                disabled={isLoading}
                className="text-xs"
              >
                <FilePdf className="h-3.5 w-3.5 mr-1" />
                Monthly PDF
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            {renderTimeLogs(logs, isLoading, formatTime)}
          </TabsContent>
          <TabsContent value="week">
            {renderTimeLogs(filterLogsForCurrentWeek(logs), isLoading, formatTime)}
          </TabsContent>
          <TabsContent value="month">
            {renderTimeLogs(filterLogsForCurrentMonth(logs), isLoading, formatTime)}
          </TabsContent>
        </Tabs>

        {filteredLogs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between">
              <span className="font-medium">Total Time:</span>
              <span className="font-bold text-primary">{formatTime(totalTime)}</span>
            </div>
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

// Helper function to render time logs
const renderTimeLogs = (logs: TimeLog[], isLoading: boolean, formatTime: (minutes: number) => string) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No time logs found for this period
      </div>
    );
  }
  
  return (
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
  );
};

export default TimeLogsList;
