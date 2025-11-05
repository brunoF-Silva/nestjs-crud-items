import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsInt,
  IsPositive,
  MaxLength,
  MinLength,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @ApiProperty({ description: 'Item name', example: 'Iphone 17' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(255, { message: 'Name cannot be longer than 255 characters' })
  name: string;

  @ApiProperty({
    description: 'A short, "teaser" description (max 300 chars)',
    example: 'The best new phone with an amazing camera.',
  })
  @IsString({ message: 'Short description must be a string' })
  @IsNotEmpty({ message: 'Short description cannot be blank' })
  @MaxLength(300, { message: 'Short description cannot exceed 300 characters' })
  shortDescription: string;

  @ApiProperty({
    description: 'A full, detailed description of the item',
    example: 'This phone features... (etc)',
  })
  @IsString({ message: 'Long description must be a string' })
  @IsNotEmpty({ message: 'Long description cannot be blank' })
  @MaxLength(5000, { message: 'Long description cannot exceed 5000 characters' })
  longDescription: string;

  @ApiProperty({ description: 'Image name or URL' })
  @IsString({ message: 'Image field must be a string' })
  @IsNotEmpty({ message: 'Image field cannot be empty' })
  @MaxLength(2048, { message: 'Image URL or path is too long' })
  image: string;

  @ApiProperty({
    description: 'Price, up to 2 decimal places. Must be a positive number.',
    example: 1299.99,
  })
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with up to 2 decimal places' },
  )
  @IsPositive({ message: 'Price must be a positive number' })
  @Min(10.99, { message: 'Price must be greater than or equal to $10' })
  @Max(10000.0, { message: 'Price must be less than or equal to $10000' })
  price: number;

  @ApiProperty({
    description: 'Optional promotional price. Must be less than the regular price.',
    example: 999.99,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Promo price must be a number with up to 2 decimal places' },
  )
  @IsPositive({ message: 'Promo price must be a positive number' })
  promoPrice?: number;

  @ApiProperty({
    description: "Item's foreign key to Users",
    example: 1,
  })
  @IsInt({ message: 'userId must be a valid integer' })
  @IsPositive({ message: 'userId must be a positive number' })
  @IsNotEmpty({ message: 'userId cannot be blank' })
  userId: number;
}
