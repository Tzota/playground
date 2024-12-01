import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Middleware1Middleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('middleware 1');
    next();
  }
}
