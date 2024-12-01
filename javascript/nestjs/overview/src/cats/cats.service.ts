import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { Randomize } from './random.service';
import { TzotaLogger } from '../log/logger.service';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(private readonly logger: TzotaLogger) {} // TzotaLogger is from global module, so I didn't register it... Hm...

  @Inject() // property injection just for fun
  private readonly rand: Randomize;

  create(cat: Cat) {
    cat.name += this.rand.get();
    this.cats.push(cat);
    this.logger.info(this.cats);
    // console.log(this.cats);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
