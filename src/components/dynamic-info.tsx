"use client";

import { useState, useEffect } from 'react';
import { Clock, MapPin, Sun } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function DynamicInfo() {
  const [time, setTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-muted-foreground animate-pulse">
                <div className="flex items-center gap-2"><Sun className="size-5" /> <div className="h-4 w-12 bg-muted rounded"></div></div>
                <div className="h-4 w-20 bg-muted rounded"></div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-muted-foreground animate-pulse">
                <div className="flex items-center gap-2"><MapPin className="size-5" /> <div className="h-4 w-24 bg-muted rounded"></div></div>
                <div className="h-4 w-16 bg-muted rounded"></div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-muted-foreground animate-pulse">
                <div className="flex items-center gap-2"><Clock className="size-5" /> <div className="h-4 w-16 bg-muted rounded"></div></div>
                <div className="h-4 w-24 bg-muted rounded"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-4 text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <Sun className="size-5 text-primary" />
          <span>Weather</span>
        </div>
        <span className="font-medium text-right">Sunny</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <MapPin className="size-5 text-primary" />
          <span>Location</span>
        </div>
        <span className="font-medium text-right">San Francisco</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <Clock className="size-5 text-primary" />
          <span>Time</span>
        </div>
        <span className="font-mono text-right">{time}</span>
      </div>
    </div>
  );
}
