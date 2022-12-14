import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'task', method: RequestMethod.POST },
        { path: 'task/:slug', method: RequestMethod.GET },
        { path: 'task', method: RequestMethod.POST },
        { path: 'task/:slug', method: RequestMethod.PUT },
        { path: 'task/:slug', method: RequestMethod.DELETE },
      );
  }
}
