"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { suggestTask } from "@/ai/flows/ai-suggest-task";
import type { Task } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AiSuggestionProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
}

export function AiSuggestion({ tasks, onAddTask }: AiSuggestionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSuggestTask = async () => {
    setIsLoading(true);
    setSuggestion(null);

    const activeTasks = tasks.filter((t) => t.status !== 'Done').map((t) => t.text);
    const completedTasks = tasks.filter((t) => t.status === 'Done').map((t) => t.text);

    let userContext = `The user has ${activeTasks.length} active tasks and ${completedTasks.length} completed tasks.`;
    if (activeTasks.length > 0) {
      userContext += `\nActive tasks: ${activeTasks.join(", ")}.`;
    }
    if (completedTasks.length > 0) {
      userContext += `\nRecently completed tasks: ${completedTasks.slice(-3).join(", ")}.`;
    }

    try {
      const result = await suggestTask({ userContext });
      if (result.taskSuggestion) {
        setSuggestion(result.taskSuggestion);
      }
    } catch (error) {
      console.error("AI suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: "Could not get a suggestion at this time. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuggestion = () => {
    if (suggestion) {
      onAddTask(suggestion);
      setSuggestion(null);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleSuggestTask}
        disabled={isLoading}
        className="bg-accent/50 hover:bg-accent"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Sparkles className="text-primary" />
        )}
        Suggest a Task
      </Button>

      <Dialog open={!!suggestion} onOpenChange={(open) => !open && setSuggestion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              AI Task Suggestion
            </DialogTitle>
            <DialogDescription>
              Here is a task suggestion based on your current list:
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 rounded-lg border bg-secondary/50 p-4 text-center text-lg font-medium text-secondary-foreground">
            {suggestion}
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddSuggestion}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
