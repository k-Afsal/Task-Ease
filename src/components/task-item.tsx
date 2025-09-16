"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Save, X, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };
  
  return (
    <Card className={cn("transition-all duration-300 flex flex-col", task.completed ? "bg-card/50" : "bg-card")}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
              disabled={isEditing}
              className="size-5"
            />
            {!isEditing && (
                 <label
                    htmlFor={`task-${task.id}`}
                    className={cn(
                    "font-semibold text-lg cursor-pointer",
                    task.completed && "line-through text-muted-foreground"
                    )}
                >
                    {task.text}
                </label>
            )}
        </div>
        
        {isEditing ? (
          <div className="flex gap-1 justify-end">
            <Button variant="ghost" size="icon" className="size-8 text-primary hover:text-primary" onClick={handleSave} aria-label="Save task">
              <Save className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={handleCancel} aria-label="Cancel edit">
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-1 justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-primary"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit task "${task.text}"`}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete task "${task.text}"`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        {isEditing ? (
          <Textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 text-base bg-transparent"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSave()}
            autoFocus
          />
        ) : (
            <p className={cn("text-sm text-muted-foreground", task.completed && "line-through")}>
                This is a placeholder for additional task content, like a description or notes.
            </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-xs text-muted-foreground gap-2">
            <CalendarIcon className="size-4" />
            <span>Due: Tomorrow</span>
          </div>
      </CardFooter>
    </Card>
  );
}