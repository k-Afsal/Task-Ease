"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { KeyRound } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("gemini_api_key", apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved successfully.",
    });
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <>
      <Header />
      <div className="flex justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="size-6" />
              API Key Configuration
            </CardTitle>
            <CardDescription>
              Manage your Gemini API key here. This key is required for AI features and is stored locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Gemini API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>
              Save Key
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
