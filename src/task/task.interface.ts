import { TaskEntity } from './task.entity';

interface TasksData {
  slug: string;
  title: string;
  description: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskRO {
  task: TaskEntity;
}

export interface TasksRO {
  tasks: TaskEntity[];
  tasksCount: number;
}
