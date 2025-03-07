
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const JiraConnect = () => {
  const [jiraUrl, setJiraUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [email, setEmail] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jiraUrl || !apiToken || !email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields to connect to Jira.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Successfully connected",
        description: "Your Jira account has been successfully connected.",
      });
    }, 2000);
  };

  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <CardTitle>Connect to Jira</CardTitle>
          <CardDescription>
            Connect your Jira account to automatically import your projects and issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="flex items-center justify-center py-6 text-center">
              <div>
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Connected to Jira</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your Jira account has been successfully connected.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsConnected(false)}
                >
                  Reconnect
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConnect} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jira-url">Jira URL</Label>
                <Input
                  id="jira-url"
                  placeholder="https://your-domain.atlassian.net"
                  value={jiraUrl}
                  onChange={(e) => setJiraUrl(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-token">API Token</Label>
                <Input
                  id="api-token"
                  type="password"
                  placeholder="Your Jira API token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can generate an API token in your{" "}
                  <a
                    href="https://id.atlassian.com/manage/api-tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Atlassian account settings
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </CardContent>
        {!isConnected && (
          <CardFooter>
            <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect to Jira"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </FadeIn>
  );
};

export default JiraConnect;
