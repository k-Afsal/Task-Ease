export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export type Task = {
  id: string;
  text: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date | string;
  createdAt: Date | string;
};
