
import React from "react";
import { Button } from "@/components/ui/button";
import Glass from "@/components/ui/Glass";
import Container from "@/components/layout/Container";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";

const Hero = () => {
  return (
    <div className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Automate Your Time Tracking with{" "}
              <span className="text-primary">TimeScribe</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect your Jira, Git, and Calendar to automatically generate detailed time logs and descriptions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/login">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>

      <Glass
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        style={{
          clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>
  );
};

export default Hero;
