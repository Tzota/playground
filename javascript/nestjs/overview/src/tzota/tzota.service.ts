import { Injectable } from '@nestjs/common';

@Injectable()
export class TzotaService {
  someMethod(added = '-'): string {
    return 'Foo bar:' + added;
  }
}
