"use client";

import { useState, useEffect } from "react";
import { type Task, type TaskStatus } from "@/lib/types";
import { AddTaskForm } from "@/components/add-task-form";
import { TaskList } from "@/components/task-list";
import { AiSuggestion } from "@/components/ai-suggestion";
import { TaskSkeleton } from "@/components/task-skeleton";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SplashScreen } from "@/components/splash-screen";
import { Header } from "@/components/header";

const TaskSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Task cannot be empty"),
  description: z.string().optional(),
  status: z.enum(['To Do', 'In Progress', 'Done']).default('To Do'),
  dueDate: z.coerce.date().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
});
const TasksSchema = z.array(TaskSchema);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(splashTimer);
  }, []);

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
          console.error("Zod validation error:", validation.error);
          // Attempt to migrate old data
          const migratedTasks = parsed.map((task: any) => ({
            ...task,
            status: task.status || 'To Do',
            createdAt: task.createdAt || new Date().toISOString(),
          }));
          const migratedValidation = TasksSchema.safeParse(migratedTasks);
          if (migratedValidation.success) {
            setTasks(migratedValidation.data);
            localStorage.setItem("tasks", JSON.stringify(migratedValidation.data));
          } else {
            console.error("Zod migration failed:", migratedValidation.error);
            localStorage.removeItem("tasks");
          }
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
        description: 'This is a placeholder for additional task content, like a description or notes.',
        status: 'To Do',
        createdAt: new Date(),
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const handleEditTask = (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const handleUpdateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(
        tasks.map((task) =>
            task.id === id ? { ...task, status } : task
        )
    );
  };


  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-5xl mx-auto">
            <Card className="shadow-2xl bg-card/60 backdrop-blur-lg border-white/20">
              <CardHeader>
                 <AddTaskForm onAddTask={handleAddTask} />
              </CardHeader>
              <CardContent>
                {isMounted ? (
                  <TaskList
                    tasks={tasks}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    onUpdateStatus={handleUpdateTaskStatus}
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
      </main>
    </>
  );
}
