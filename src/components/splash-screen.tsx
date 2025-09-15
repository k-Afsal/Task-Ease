"use client";

import { ClipboardCheck } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center animate-fade-in">
      <ClipboardCheck className="size-24 text-primary animate-bounce" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Welcome to TaskEase
      </h1>
      <p className="text-lg text-muted-foreground">
        Your simple and smart to-do list.
      </p>
    </div>
  );
}
