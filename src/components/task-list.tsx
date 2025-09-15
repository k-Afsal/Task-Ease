"use client";

import type { Task } from "@/lib/types";
import { TaskItem } from "@/components/task-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p className="text-lg">Your task list is empty.</p>
        <p>Add a new task to get started!</p>
      </div>
    );
  }
  
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <ScrollArea className="h-[40vh] pr-4">
      <div className="space-y-2">
        {activeTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}

        {activeTasks.length > 0 && completedTasks.length > 0 && (
            <div className="py-2">
                <Separator />
            </div>
        )}

        {completedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
