
import React from "react";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-24 pb-12 flex items-center">
        <Container className="max-w-md mx-auto">
          <FadeIn>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                  Enter your details to create your TimeScribe account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" type="text" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="yourname@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full">Create account</Button>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </FadeIn>
        </Container>
      </main>
    </div>
  );
};

export default Register;
