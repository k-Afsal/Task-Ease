"use client";

import { useState } from "react";
import type { Task, TaskStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Save, X, Calendar as CalendarIcon, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

export function TaskItem({ task, onDelete, onEdit, onUpdateStatus }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, { 
        text: editText.trim(),
        description: editDescription.trim(),
        dueDate: editDueDate,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
    setEditDescription(task.description || '');
    setEditDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
  };

  const statusToVariant: Record<TaskStatus, "default" | "secondary" | "destructive"> = {
    'To Do': 'secondary',
    'In Progress': 'default',
    'Done': 'destructive'
  };

  const statusToColor = {
    'To Do': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Done': 'bg-green-500',
  };

  return (
    <Card className={cn(
      "transition-all duration-300 flex flex-col group",
      task.status === 'Done' ? "bg-card/50" : "bg-card"
    )}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
        <div className="flex items-start gap-3 flex-grow">
          <div className={cn("w-2 h-2 rounded-full mt-2.5", statusToColor[task.status])}></div>
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="font-semibold text-lg p-0 border-0 bg-transparent focus-visible:ring-0"
            />
          ) : (
            <CardTitle className={cn(
              "font-semibold text-lg",
              task.status === 'Done' && "line-through text-muted-foreground"
            )}>
              {task.text}
            </CardTitle>
          )}
        </div>
        
        <div className="flex gap-1 items-center">
            {isEditing ? (
              <>
                <Button variant="ghost" size="icon" className="size-8 text-primary hover:text-primary" onClick={handleSave} aria-label="Save task">
                  <Save className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" onClick={handleCancel} aria-label="Cancel edit">
                  <X className="size-4" />
                </Button>
              </>
            ) : (
                <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsEditing(true)}
                  aria-label={`Edit task "${task.text}"`}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDelete(task.id)}
                  aria-label={`Delete task "${task.text}"`}
                >
                  <Trash2 className="size-4" />
                </Button>
                </>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        {isEditing ? (
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="flex-1 text-sm bg-transparent"
            placeholder="Add a description..."
          />
        ) : (
            <p className={cn("text-sm text-muted-foreground", task.status === 'Done' && "line-through")}>
                {task.description}
            </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="w-full">
            <Select value={task.status} onValueChange={(value: TaskStatus) => onUpdateStatus(task.id, value)}>
                <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Set status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="flex justify-between w-full items-center">
            {isEditing ? (
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal h-8 text-xs",
                        !editDueDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editDueDate ? format(editDueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={editDueDate}
                        onSelect={setEditDueDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            ) : (
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <CalendarIcon className="size-4" />
                    <span>{task.dueDate ? `Due: ${format(new Date(task.dueDate), "MMM dd")}` : "No due date"}</span>
                </div>
            )}
            <div className="text-xs text-muted-foreground">
                Created: {format(new Date(task.createdAt), "MMM dd")}
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
