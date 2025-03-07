
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const isDemoMode = localStorage.getItem('is_demo_mode') === 'true';

  useEffect(() => {
    // If we're in demo mode, just redirect to dashboard
    if (isDemoMode) {
      navigate('/dashboard');
      return;
    }

    const handleAuthCallback = async () => {
      try {
        // The hash contains the token details
        // Supabase will automatically handle this
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Authentication failed",
            description: error.message || "There was a problem with your authentication.",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }
        
        if (data?.session) {
          // Get the Jira access token from the session
          const jiraToken = data.session.provider_token;
          
          if (jiraToken) {
            // Store the Jira token for later API calls
            localStorage.setItem('jira_token', jiraToken);
            
            console.log('Jira authentication successful', { 
              user: data.session.user,
              provider: data.session.user.app_metadata.provider
            });
          }
          
          toast({
            title: "Login successful",
            description: "You have been authenticated successfully with Jira.",
          });
          navigate('/dashboard');
        } else {
          // If no session, redirect to login
          navigate('/login');
        }
      } catch (error: any) {
        console.error('Auth callback processing error:', error);
        toast({
          title: "Authentication error",
          description: error.message || "An unexpected error occurred during authentication.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Authentication...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
