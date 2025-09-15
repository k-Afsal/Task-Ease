"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        disabled={isEditing}
      />
      {isEditing ? (
        <Input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 text-base"
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "flex-1 text-base cursor-pointer",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.text}
        </label>
      )}

      {isEditing ? (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="size-8 text-primary hover:text-primary" onClick={handleSave} aria-label="Save task">
            <Save className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={handleCancel} aria-label="Cancel edit">
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-1">
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
    </div>
  );
}
