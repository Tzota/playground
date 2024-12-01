import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { TzotaController } from './tzota/tzota.controller';

import { AppService } from './app.service';
import { TzotaService } from './tzota/tzota.service';
import { CatsModule } from './cats/cats.module';
import { LogModule } from './log/log.module';

import { Middleware1Middleware } from './middleware1/middleware1.middleware';

@Module({
  imports: [CatsModule, LogModule],
  controllers: [AppController, TzotaController],
  providers: [AppService, TzotaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware1Middleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET })
      .apply(Middleware1Middleware)
      .exclude('tzota/object')
      .forRoutes(TzotaController);
  }
}
