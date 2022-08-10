import { Injectable } from '@nestjs/common';
import { TaskRO, TasksRO } from './task.interface';
import {
  DeleteResult,
  FindOptionsWhere,
  getRepository,
  ObjectID,
  Repository,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll(query): Promise<TasksRO> {
    const qb = await this.taskRepository.createQueryBuilder('task');

    qb.where('1 = 1');

    qb.orderBy('task.created', 'DESC');

    const tasksCount = await qb.getCount();

    const tasks = await qb.getMany();

    return { tasks, tasksCount };
  }

  async findOne(id): Promise<TaskRO> {
    const task = await this.taskRepository.findOneById(id);
    return { task };
  }

  async create(taskData: CreateTaskDto): Promise<TaskEntity> {
    const task = new TaskEntity();
    task.title = taskData.title;
    task.description = taskData.description;
    task.body = taskData.body;

    const newArticle = await this.taskRepository.save(task);

    return newArticle;
  }

  async update(id: number, taskData: any): Promise<TaskRO> {
    const toUpdate = await this.taskRepository.findOneById(id);
    const updated = Object.assign(toUpdate, taskData);
    const task = await this.taskRepository.save(updated);
    return { task };
  }

  async delete(slug: number): Promise<DeleteResult> {
    return await this.taskRepository.delete({ id: slug });
  }
}
