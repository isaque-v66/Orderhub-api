import { IsString, IsInt, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @IsString()
  companyId!: string;

  items!: CreateOrderItemDto[];
}
