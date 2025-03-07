
import React from "react";
import { cn } from "@/lib/utils";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  border?: boolean;
}

export const Glass = ({
  children,
  className,
  intensity = "medium",
  border = true,
  ...props
}: GlassProps) => {
  const intensityMap = {
    light: "bg-white/30 backdrop-blur-sm",
    medium: "bg-white/50 backdrop-blur-md",
    heavy: "bg-white/70 backdrop-blur-lg",
  };

  return (
    <div
      className={cn(
        intensityMap[intensity],
        border && "border border-white/20",
        "rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Glass;
