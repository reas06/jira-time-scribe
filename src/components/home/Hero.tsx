
import React from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { Link } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import Glass from "@/components/ui/Glass";
import { ArrowRight, Clock, GitBranch, MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 right-0 -z-10 transform-gpu blur-3xl opacity-20" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#4171e8] to-[#9089fc]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="absolute -bottom-24 -left-4 -z-10 transform-gpu blur-3xl opacity-20" aria-hidden="true">
          <div
            className="aspect-[577/300] w-[36.0625rem] bg-gradient-to-r from-[#6366f1] to-[#0ea5e9]"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
      </div>

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={100}>
            <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/30 mb-6">
              Beta Release
            </span>
          </FadeIn>
          <FadeIn delay={200}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Automate your time tracking with precision
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              TimeScribe integrates with Jira, BitBucket, and your calendar to generate accurate time logs with rich, automatically generated descriptions.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="px-8">
                <Link to="/login">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8">
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={500} className="mt-16 sm:mt-24">
          <div className="relative mx-auto overflow-hidden rounded-xl border border-gray-200 shadow-2xl dark:border-gray-800">
            <div className="bg-gray-900 py-2 px-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-400">TimeScribe Dashboard</span>
              </div>
            </div>
            <div className="relative bg-white dark:bg-gray-950 w-full aspect-[5/3] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Dashboard preview will be displayed here
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <FadeIn delay={600} direction="up">
            <Glass className="p-6">
              <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Automated Time Logs</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Connect to Jira and automatically populate time entries with tasks you've been working on.
              </p>
            </Glass>
          </FadeIn>
          
          <FadeIn delay={700} direction="up">
            <Glass className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Git Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Pull in your commit messages to create more detailed time log descriptions automatically.
              </p>
            </Glass>
          </FadeIn>
          
          <FadeIn delay={800} direction="up">
            <Glass className="p-6">
              <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Calendar Sync</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Import meetings from your calendar and automatically log time spent in discussions.
              </p>
            </Glass>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
