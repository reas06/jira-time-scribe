
import React from "react";
import Container from "@/components/layout/Container";
import FadeIn from "@/components/animations/FadeIn";
import { 
  CalendarDays, 
  Clock, 
  ClipboardCheck, 
  GitBranch, 
  MessageSquare, 
  RefreshCcw, 
  Shield, 
  Zap 
} from "lucide-react";

const features = [
  {
    name: "Jira Integration",
    description: "Connect directly to your Jira projects to import tasks, issues, and time logs.",
    icon: ClipboardCheck,
  },
  {
    name: "Automatic Descriptions",
    description: "Generate detailed descriptions from Jira comments, git commits, and more.",
    icon: MessageSquare,
  },
  {
    name: "Git Sync",
    description: "Pull information from your commits to enhance time log details.",
    icon: GitBranch,
  },
  {
    name: "Calendar Integration",
    description: "Import meetings and events from your calendar to track discussion time.",
    icon: CalendarDays,
  },
  {
    name: "Time Tracking",
    description: "Accurate tracking of time spent on tasks with minimal manual input required.",
    icon: Clock,
  },
  {
    name: "Real-time Sync",
    description: "Changes in connected systems are reflected immediately in your time logs.",
    icon: RefreshCcw,
  },
  {
    name: "Secure Connection",
    description: "Your data is secured with enterprise-grade encryption and authentication.",
    icon: Shield,
  },
  {
    name: "Performance Insights",
    description: "Gain valuable insights into how your time is spent across projects and tasks.",
    icon: Zap,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-base font-semibold leading-7 text-primary">Features</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for seamless time tracking
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              TimeScribe automates the tedious parts of time tracking, letting you focus on what matters most: your work.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeIn 
              key={feature.name} 
              delay={300 + index * 50} 
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full transition-all duration-300 hover:shadow-md hover:border-primary/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
