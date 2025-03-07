
import { formatISO, subDays, addDays } from 'date-fns';
import { JiraIssue } from './JiraService';

// Generate realistic dummy data for Jira issues
export const generateDummyJiraIssues = (): JiraIssue[] => {
  const now = new Date();
  
  const statuses = [
    { name: 'To Do', id: '1' },
    { name: 'In Progress', id: '2' },
    { name: 'In Review', id: '3' },
    { name: 'Done', id: '4' }
  ];
  
  const priorities = [
    { name: 'Highest', id: '1', iconUrl: '' },
    { name: 'High', id: '2', iconUrl: '' },
    { name: 'Medium', id: '3', iconUrl: '' },
    { name: 'Low', id: '4', iconUrl: '' }
  ];
  
  const issueTypes = [
    { name: 'Bug', id: '1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2621/2621218.png' },
    { name: 'Task', id: '2', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2098/2098402.png' },
    { name: 'Story', id: '3', iconUrl: 'https://cdn-icons-png.flaticon.com/512/5956/5956592.png' },
    { name: 'Epic', id: '4', iconUrl: 'https://cdn-icons-png.flaticon.com/512/7605/7605198.png' }
  ];
  
  const dummyIssues: JiraIssue[] = [
    {
      id: "DEMO-1",
      key: "DEMO-1",
      fields: {
        summary: "Implement user authentication flow",
        description: "Add OAuth2 authentication with Jira and email/password login options",
        created: formatISO(subDays(now, 15)),
        updated: formatISO(subDays(now, 2)),
        duedate: formatISO(addDays(now, 5)),
        issuetype: issueTypes[2], // Story
        priority: priorities[1], // High
        status: statuses[1], // In Progress
        comment: {
          comments: [
            {
              id: "1",
              body: "I'm working on integrating the Jira OAuth",
              created: formatISO(subDays(now, 5)),
              updated: formatISO(subDays(now, 5)), // Adding the updated field with same value as created
              author: {
                displayName: "Demo User",
                avatarUrls: {
                  "48x48": "https://secure.gravatar.com/avatar/1234567890abcdef?d=https%3A%2F%2Favatar-management.service.mailchimp.com%2F1.0%2Fimages%2Fdefault-avatar.png"
                }
              }
            },
            {
              id: "2",
              body: "Added email/password authentication yesterday, will now focus on the OAuth part",
              created: formatISO(subDays(now, 3)),
              updated: formatISO(subDays(now, 3)), // Adding the updated field with same value as created
              author: {
                displayName: "Demo User",
                avatarUrls: {
                  "48x48": "https://secure.gravatar.com/avatar/1234567890abcdef?d=https%3A%2F%2Favatar-management.service.mailchimp.com%2F1.0%2Fimages%2Fdefault-avatar.png"
                }
              }
            }
          ]
        }
      }
    },
    {
      id: "DEMO-2",
      key: "DEMO-2",
      fields: {
        summary: "Design dashboard layout",
        description: "Create a responsive dashboard layout with sidebar navigation and main content area",
        created: formatISO(subDays(now, 10)),
        updated: formatISO(subDays(now, 1)),
        duedate: formatISO(addDays(now, 2)),
        issuetype: issueTypes[2], // Story
        priority: priorities[2], // Medium
        status: statuses[3], // Done
        comment: {
          comments: [
            {
              id: "3",
              body: "Dashboard layout is complete, added responsive design for mobile",
              created: formatISO(subDays(now, 1)),
              updated: formatISO(subDays(now, 1)), // Adding the updated field with same value as created
              author: {
                displayName: "Demo User",
                avatarUrls: {
                  "48x48": "https://secure.gravatar.com/avatar/1234567890abcdef?d=https%3A%2F%2Favatar-management.service.mailchimp.com%2F1.0%2Fimages%2Fdefault-avatar.png"
                }
              }
            }
          ]
        }
      }
    },
    {
      id: "DEMO-3",
      key: "DEMO-3",
      fields: {
        summary: "Fix time tracking component",
        description: "The time tracking component doesn't show the correct hours spent on each task",
        created: formatISO(subDays(now, 5)),
        updated: formatISO(subDays(now, 1)),
        duedate: formatISO(addDays(now, 1)),
        issuetype: issueTypes[0], // Bug
        priority: priorities[0], // Highest
        status: statuses[1], // In Progress
        comment: {
          comments: [
            {
              id: "4",
              body: "Found the issue, it's related to timezone conversion",
              created: formatISO(subDays(now, 2)),
              updated: formatISO(subDays(now, 2)), // Adding the updated field with same value as created
              author: {
                displayName: "Demo User",
                avatarUrls: {
                  "48x48": "https://secure.gravatar.com/avatar/1234567890abcdef?d=https%3A%2F%2Favatar-management.service.mailchimp.com%2F1.0%2Fimages%2Fdefault-avatar.png"
                }
              }
            }
          ]
        }
      }
    },
    {
      id: "DEMO-4",
      key: "DEMO-4",
      fields: {
        summary: "Implement report generation feature",
        description: "Add functionality to generate PDF reports of time spent on tasks",
        created: formatISO(subDays(now, 20)),
        updated: formatISO(subDays(now, 18)),
        duedate: formatISO(addDays(now, 10)),
        issuetype: issueTypes[3], // Epic
        priority: priorities[2], // Medium
        status: statuses[0], // To Do
        comment: {
          comments: []
        }
      }
    },
    {
      id: "DEMO-5",
      key: "DEMO-5",
      fields: {
        summary: "Add Git repository integration",
        description: "Connect to GitHub/BitBucket to pull commit information",
        created: formatISO(subDays(now, 12)),
        updated: formatISO(subDays(now, 8)),
        duedate: formatISO(addDays(now, 7)),
        issuetype: issueTypes[2], // Story
        priority: priorities[2], // Medium
        status: statuses[0], // To Do
        comment: {
          comments: [
            {
              id: "5",
              body: "Need to research available APIs for GitHub and BitBucket",
              created: formatISO(subDays(now, 8)),
              updated: formatISO(subDays(now, 8)), // Adding the updated field with same value as created
              author: {
                displayName: "Demo User",
                avatarUrls: {
                  "48x48": "https://secure.gravatar.com/avatar/1234567890abcdef?d=https%3A%2F%2Favatar-management.service.mailchimp.com%2F1.0%2Fimages%2Fdefault-avatar.png"
                }
              }
            }
          ]
        }
      }
    },
    {
      id: "DEMO-6",
      key: "DEMO-6",
      fields: {
        summary: "Improve mobile responsiveness",
        description: "Optimize UI for mobile devices and tablets",
        created: formatISO(subDays(now, 8)),
        updated: formatISO(subDays(now, 4)),
        duedate: null,
        issuetype: issueTypes[1], // Task
        priority: priorities[3], // Low
        status: statuses[2], // In Review
        comment: {
          comments: [
            {
              id: "6",
              body: "Mobile layout improvements added, please review on different screen sizes",
              created: formatISO(subDays(now, 4)),
              updated: formatISO(subDays(now, 4)), // Adding the updated field with same value as created
              author: {
                displayName: "Demo User",
                avatarUrls: {
                  "48x48": "https://secure.gravatar.com/avatar/1234567890abcdef?d=https%3A%2F%2Favatar-management.service.mailchimp.com%2F1.0%2Fimages%2Fdefault-avatar.png"
                }
              }
            }
          ]
        }
      }
    },
    {
      id: "DEMO-7",
      key: "DEMO-7",
      fields: {
        summary: "Calendar integration with Google Calendar",
        description: "Import meetings from Google Calendar to automatically log discussion time",
        created: formatISO(subDays(now, 25)),
        updated: formatISO(subDays(now, 15)),
        duedate: formatISO(addDays(now, 15)),
        issuetype: issueTypes[2], // Story
        priority: priorities[1], // High
        status: statuses[0], // To Do
        comment: {
          comments: []
        }
      }
    }
  ];
  
  return dummyIssues;
};

export const generateTimeLogData = () => {
  const now = new Date();
  
  return [
    {
      id: "log-1",
      issueKey: "DEMO-1",
      issueSummary: "Implement user authentication flow",
      date: formatISO(subDays(now, 2)),
      timeSpent: 3 * 60, // 3 hours in minutes
      description: "Working on OAuth integration with Jira",
    },
    {
      id: "log-2",
      issueKey: "DEMO-3",
      issueSummary: "Fix time tracking component",
      date: formatISO(subDays(now, 1)),
      timeSpent: 2 * 60, // 2 hours in minutes
      description: "Debugging timezone issues in the time tracking component",
    },
    {
      id: "log-3",
      issueKey: "DEMO-2",
      issueSummary: "Design dashboard layout",
      date: formatISO(subDays(now, 3)),
      timeSpent: 4 * 60, // 4 hours in minutes
      description: "Creating responsive design for the dashboard",
    },
    {
      id: "log-4",
      issueKey: "DEMO-6",
      issueSummary: "Improve mobile responsiveness",
      date: formatISO(subDays(now, 4)),
      timeSpent: 1.5 * 60, // 1.5 hours in minutes
      description: "Testing and fixing UI on mobile devices",
    }
  ];
};

// Demo service implementation
export const demoJiraService = {
  getAssignedIssues: async (): Promise<JiraIssue[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateDummyJiraIssues());
      }, 800);
    });
  },
  
  getTimeLogData: async () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateTimeLogData());
      }, 600);
    });
  }
};
