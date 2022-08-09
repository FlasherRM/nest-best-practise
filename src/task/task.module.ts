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
    consumer;
    // .apply(AuthMiddleware)
    // .forRoutes(
    //   { path: 'articles/feed', method: RequestMethod.GET },
    //   { path: 'articles', method: RequestMethod.POST },
    //   { path: 'articles/:slug', method: RequestMethod.DELETE },
    //   { path: 'articles/:slug', method: RequestMethod.PUT },
    //   { path: 'articles/:slug/comments', method: RequestMethod.POST },
    //   { path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE },
    //   { path: 'articles/:slug/favorite', method: RequestMethod.POST },
    //   { path: 'articles/:slug/favorite', method: RequestMethod.DELETE },
    // );
  }
}