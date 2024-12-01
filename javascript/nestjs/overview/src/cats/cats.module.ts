import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Randomize } from './random.service';
import { Middleware2Middleware } from '../middleware2/middleware2.middleware';

@Module({
  controllers: [CatsController],
  providers: [CatsService, Randomize],
  exports: [CatsService], // same instance
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // I can even register middleware for external routes? :(s
    consumer.apply(Middleware2Middleware).forRoutes('tzota/foo');
  }
}
