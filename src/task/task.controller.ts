import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { TaskRO, TasksRO } from './task.interface';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  @Get()
  async findAll(@Query() query): Promise<TasksRO> {
    return await this.taskService.findAll(query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug): Promise<TaskRO> {
    return await this.taskService.findOne(slug);
  }

  @ApiOperation({ summary: 'Create Task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() taskData: CreateTaskDto) {
    return this.taskService.create(taskData);
  }
}
