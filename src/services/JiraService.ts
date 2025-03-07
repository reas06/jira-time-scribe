
import { supabase } from "@/integrations/supabase/client";

interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    description?: string;
    status: {
      name: string;
    };
    assignee?: {
      displayName: string;
      avatarUrls: {
        [key: string]: string;
      };
    };
    duedate?: string;
    created: string;
    updated: string;
    priority?: {
      name: string;
      iconUrl: string;
    };
    issuetype: {
      name: string;
      iconUrl: string;
    };
    timetracking?: {
      originalEstimate?: string;
      remainingEstimate?: string;
      timeSpent?: string;
    };
    comment?: {
      comments: Array<{
        id: string;
        author: {
          displayName: string;
          avatarUrls: {
            [key: string]: string;
          };
        };
        body: string;
        created: string;
        updated: string;
      }>;
    };
  };
}

interface JiraWorklog {
  id: string;
  author: {
    displayName: string;
    avatarUrls: {
      [key: string]: string;
    };
  };
  comment?: string;
  started: string; 
  timeSpent: string;
  timeSpentSeconds: number;
}

class JiraService {
  private baseUrl = 'https://api.atlassian.com';
  private cloudId: string | null = null;

  async initialize(): Promise<boolean> {
    try {
      // Get the session to retrieve the access token
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        console.error('No active session found');
        return false;
      }
      
      // Get the cloud ID (needed for most Jira Cloud REST API endpoints)
      if (!this.cloudId) {
        const cloudIdResult = await this.getCloudId(sessionData.session.provider_token);
        if (!cloudIdResult) {
          console.error('Could not retrieve Jira Cloud ID');
          return false;
        }
        this.cloudId = cloudIdResult;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Jira service', error);
      return false;
    }
  }

  private async getCloudId(accessToken: string | undefined): Promise<string | null> {
    if (!accessToken) {
      console.error('No access token available');
      return null;
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/oauth/token/accessible-resources`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get cloud ID: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        return data[0].id;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting Jira cloud ID', error);
      return null;
    }
  }

  async getAssignedIssues(): Promise<JiraIssue[]> {
    try {
      if (!await this.initialize()) {
        return [];
      }
      
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.provider_token;
      
      if (!accessToken) {
        console.error('No access token found');
        return [];
      }
      
      // Query for issues assigned to the current user
      const jql = 'assignee = currentUser() ORDER BY updated DESC';
      const response = await fetch(
        `${this.baseUrl}/ex/jira/${this.cloudId}/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to get issues: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.issues || [];
    } catch (error) {
      console.error('Error getting assigned issues', error);
      return [];
    }
  }

  async getIssueWorklogs(issueKey: string): Promise<JiraWorklog[]> {
    try {
      if (!await this.initialize()) {
        return [];
      }
      
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.provider_token;
      
      if (!accessToken) {
        console.error('No access token found');
        return [];
      }
      
      const response = await fetch(
        `${this.baseUrl}/ex/jira/${this.cloudId}/rest/api/3/issue/${issueKey}/worklog`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to get worklogs: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.worklogs || [];
    } catch (error) {
      console.error(`Error getting worklogs for issue ${issueKey}`, error);
      return [];
    }
  }

  async addWorklog(issueKey: string, timeSpentSeconds: number, comment: string = ''): Promise<boolean> {
    try {
      if (!await this.initialize()) {
        return false;
      }
      
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.provider_token;
      
      if (!accessToken) {
        console.error('No access token found');
        return false;
      }
      
      const response = await fetch(
        `${this.baseUrl}/ex/jira/${this.cloudId}/rest/api/3/issue/${issueKey}/worklog`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            timeSpentSeconds: timeSpentSeconds,
            comment: {
              type: "doc",
              version: 1,
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: comment,
                      type: "text"
                    }
                  ]
                }
              ]
            }
          })
        }
      );
      
      return response.ok;
    } catch (error) {
      console.error(`Error adding worklog to issue ${issueKey}`, error);
      return false;
    }
  }
}

export const jiraService = new JiraService();
export type { JiraIssue, JiraWorklog };
