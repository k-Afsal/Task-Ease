"use client";

import { useState, useEffect } from 'react';
import { Clock, MapPin, Sun, Moon, CloudSun } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function DynamicInfo() {
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      const hour = now.getHours();
      if (hour < 12) {
        setGreeting('Good Morning');
      } else if (hour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Night');
      }
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const GreetingIcon = () => {
    if (greeting === 'Good Morning') return <CloudSun className="size-4" />;
    if (greeting === 'Good Afternoon') return <Sun className="size-4" />;
    if (greeting === 'Good Night') return <Moon className="size-4" />;
    return <Sun className="size-4" />;
  };

  if (!isMounted) {
    return (
        <div className="flex items-center gap-6 text-sm text-primary-foreground animate-pulse">
            <div className="flex items-center gap-2"><Sun className="size-4" /> <Skeleton className="h-4 w-24" /></div>
            <div className="flex items-center gap-2"><MapPin className="size-4" /> <Skeleton className="h-4 w-20" /></div>
            <div className="flex items-center gap-2"><Clock className="size-4" /> <Skeleton className="h-4 w-16" /></div>
        </div>
    );
  }

  return (
    <div className="flex items-center gap-4 md:gap-6 text-sm text-primary-foreground">
      <div className="flex items-center gap-2 font-medium">
        <GreetingIcon />
        <span>{greeting}</span>
      </div>
      <div className="flex items-center gap-2 font-medium">
        <MapPin className="size-4" />
        <span>San Francisco</span>
      </div>
      <div className="flex items-center gap-2 font-medium">
        <Clock className="size-4" />
        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
}
