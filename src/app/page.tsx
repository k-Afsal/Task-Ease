"use client";

import { useState, useEffect } from "react";
import { type Task } from "@/lib/types";
import { AddTaskForm } from "@/components/add-task-form";
import { TaskList } from "@/components/task-list";
import { AiSuggestion } from "@/components/ai-suggestion";
import { TaskSkeleton } from "@/components/task-skeleton";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicInfo } from "@/components/dynamic-info";
import { Separator } from "@/components/ui/separator";

const TaskSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Task cannot be empty"),
  completed: z.boolean(),
});
const TasksSchema = z.array(TaskSchema);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks);
        const validation = TasksSchema.safeParse(parsed);
        if (validation.success) {
          setTasks(validation.data);
        } else {
          localStorage.removeItem("tasks");
        }
      }
    } catch (e) {
      console.error("Failed to load tasks from local storage", e);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  const handleAddTask = (text: string) => {
    if (text.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        text,
        completed: false,
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const handleEditTask = (id: string, text: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text } : task))
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="shadow-2xl bg-card/60 backdrop-blur-lg border-white/20">
          <CardHeader>
            <div className="text-center mb-4">
              <h1 className="font-headline text-5xl font-bold text-white drop-shadow-lg">
                TaskEase
              </h1>
              <p className="text-gray-200 mt-2 text-lg drop-shadow-md">
                Your calm and focused to-do list.
              </p>
            </div>
             <AddTaskForm onAddTask={handleAddTask} />
          </CardHeader>
          <CardContent>
            {isMounted ? (
              <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ) : (
              <TaskSkeleton />
            )}
            <div className="mt-6 flex justify-center">
              <AiSuggestion tasks={tasks} onAddTask={handleAddTask} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
         <Card className="shadow-2xl bg-card/60 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-card-foreground">At a Glance</CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicInfo />
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
