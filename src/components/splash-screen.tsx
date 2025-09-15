"use client";

import { ClipboardCheck, CheckCircle, Sparkles, FilePlus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const AnimatedIcon = ({ icon: Icon, className, delay }: { icon: React.ElementType, className?: string, delay: string }) => {
  return (
    <div 
      className={cn(
        "absolute text-primary opacity-0 animate-fade-in-out",
        className
      )} 
      style={{ animationDelay: delay }}
    >
      <Icon className="size-10 sm:size-12 drop-shadow-lg" />
    </div>
  )
}

export function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center overflow-hidden bg-gradient-to-br from-background via-card to-secondary/20">
      <div className="relative flex items-center justify-center size-52 sm:size-64">
        <AnimatedIcon icon={CheckCircle} delay="0.5s" className="top-0 left-1/4" />
        <AnimatedIcon icon={Sparkles} delay="1s" className="top-1/4 right-0" />
        <AnimatedIcon icon={FilePlus} delay="1.5s" className="bottom-1/4 left-0" />
        <AnimatedIcon icon={Zap} delay="2s" className="bottom-0 right-1/4" />
        
        <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0s' }}>
          <ClipboardCheck className="size-24 sm:size-32 text-primary animate-pulse-slow" />
        </div>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '2.5s' }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl drop-shadow-md">
          Welcome to TaskEase
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your simple and smart to-do list.
        </p>
      </div>
    </div>
  );
}
