import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TzotaService } from './tzota.service';

@Controller('tzota')
export class TzotaController {
  constructor(private readonly tzotaService: TzotaService) {}

  @Get('foo')
  Foo(@Headers('added-header') addedHeader: string): string {
    return this.tzotaService.someMethod(addedHeader);
  }

  @Get('object')
  Object(): Record<string, string> {
    return { foo: 'bar' };
  }

  @Get('error')
  @HttpCode(500)
  PermanentError(): string {
    return 'uh oh';
  }

  @Get('customError')
  CustomError(): never {
    throw new Error('booo');
  }

  @Get('concreteError')
  ConcreteError(): never {
    throw new HttpException('booo', HttpStatus.GATEWAY_TIMEOUT);
  }
}
