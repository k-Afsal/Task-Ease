"use client";

import type { Task, TaskStatus } from "@/lib/types";
import { TaskItem } from "@/components/task-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

export function TaskList({ tasks, onDelete, onEdit, onUpdateStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p className="text-lg">Your task list is empty.</p>
        <p>Add a new task to get started!</p>
      </div>
    );
  }
  
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <ScrollArea className="h-[calc(100vh-280px)] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
