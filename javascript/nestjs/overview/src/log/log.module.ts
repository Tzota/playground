import { Global, Module } from '@nestjs/common';
import { TzotaLogger } from './logger.service';

@Global() // so what?
@Module({
  imports: [TzotaLogger],
  exports: [TzotaLogger],
  providers: [TzotaLogger],
})
export class LogModule {}
