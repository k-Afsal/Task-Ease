"use client";

import { Check, ClipboardCheck, Sparkles, Zap, Plus, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const OrbitingIcon = ({ icon: Icon, className, delay, duration }: { icon: React.ElementType, className?: string, delay: string, duration: string }) => {
  return (
    <div 
      className={cn(
        "absolute text-primary opacity-0 animate-orbit",
        className
      )} 
      style={{ 
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <Icon className="size-8 sm:size-10 drop-shadow-lg" />
    </div>
  )
}

export function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 text-center overflow-hidden bg-gradient-to-br from-background via-card to-secondary/20">
      <div className="relative flex items-center justify-center size-60 sm:size-72">
        {/* Orbiting Icons */}
        <OrbitingIcon icon={Sparkles} delay="0.5s" duration="10s" className="top-0 left-1/2" />
        <OrbitingIcon icon={Zap} delay="1s" duration="12s" className="top-1/4 right-0" />
        <OrbitingIcon icon={Plus} delay="1.5s" duration="11s" className="bottom-1/4 left-0" />
        <OrbitingIcon icon={Rocket} delay="2s" duration="9s" className="bottom-0 right-1/2" />
        
        {/* Central Element */}
        <div className="relative z-10 animate-fade-in-pop" style={{ animationDelay: '0s' }}>
          <div className="relative flex items-center justify-center size-32 sm:size-40 rounded-full bg-primary/10 shadow-inner">
             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse-slow"></div>
             <ClipboardCheck className="size-20 sm:size-24 text-primary animate-subtle-float" />
             <div className="absolute -top-2 -right-2 p-2 bg-primary rounded-full text-primary-foreground animate-fade-in" style={{animationDelay: '2.5s'}}>
                <Check className="size-6"/>
             </div>
          </div>
        </div>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '3s' }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl drop-shadow-md">
          Hi there! Welcome to TaskEase.
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Getting things organized for you...
        </p>
      </div>
    </div>
  );
}
