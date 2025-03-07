
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
}

export const Container = ({
  children,
  className,
  as: Component = "div",
  maxWidth = "xl",
  ...props
}: ContainerProps) => {
  const maxWidthClass = maxWidth === "none" 
    ? "" 
    : maxWidth === "full" 
      ? "w-full" 
      : `max-w-${maxWidth}`;

  return (
    <Component
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        maxWidthClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
