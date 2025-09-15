"use client";

import type { Task } from "@/lib/types";
import { TaskItem } from "@/components/task-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
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
      <Table>
        <TableCaption>
          {completedTasks.length} completed tasks.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
