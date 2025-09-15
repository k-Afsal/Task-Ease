"use client";

import { useState, useEffect } from 'react';
import { Clock, MapPin, Sun } from 'lucide-react';

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
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 text-white text-sm drop-shadow mb-4">
      <div className="flex items-center gap-1">
        <Sun className="size-4" />
        <span>Sunny</span>
      </div>
      <div className="flex items-center gap-1">
        <MapPin className="size-4" />
        <span>San Francisco</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="size-4" />
        <span>{time}</span>
      </div>
    </div>
  );
}
