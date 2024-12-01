import { Test, TestingModule } from '@nestjs/testing';
import { TzotaController } from './tzota.controller';
import { TzotaService } from './tzota.service';

describe('TzotaController', () => {
  let tzotaController: TzotaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TzotaController],
      providers: [TzotaService],
    }).compile();

    tzotaController = app.get<TzotaController>(TzotaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tzotaController.Foo()).toBe('Foo bar');
    });
  });
});
