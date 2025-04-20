import { IsNumber, Min } from 'class-validator';

export class FareAmountDto {
  @IsNumber()
  @Min(0)
  amount: number;
}
