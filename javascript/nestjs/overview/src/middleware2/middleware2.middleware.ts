import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Middleware2Middleware implements NestMiddleware {
  // use(req: any, res: any, next: () => void) {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middleware 2');
    req.headers['added-header'] = 'my header, added in middleware 2';
    res.setHeader('out-added-header', 'mid2');
    // console.log(req.rawHeaders);
    // console.log(res);
    next();
  }
}
