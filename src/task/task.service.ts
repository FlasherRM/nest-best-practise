import { Injectable } from '@nestjs/common';
import { TaskRO, TasksRO } from './task.interface';
import { getRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import slug from 'slug';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async findAll(query): Promise<TasksRO> {
    const qb = await getRepository(TaskEntity)
      .createQueryBuilder('task')

    qb.where('1 = 1');

    qb.orderBy('article.created', 'DESC');

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
}
