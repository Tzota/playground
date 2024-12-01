import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  n: string;

  @IsPositive()
  a: number;

  b: string;
}
