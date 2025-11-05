import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'sample@test.com'
  })
  @IsEmail({}, { message: "It must be a valid email"}) // Verifica se é um email válido
  @IsNotEmpty({ message: "Password field can\'t be blank " }) // Verifica se não está vazio
  email: string;

  @ApiProperty({
    description: 'User password - 6 characters at least',
    example: 'safePassword123',
    minLength: 6,
  })
  @IsString({message:'Password field must be string'})
  @IsNotEmpty({message:'The field can\'t be blank'})
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Smith',
  })
  @IsString({message: 'Name field must be a string'})
  @IsOptional({message: 'Name field is optional'}) // Corresponde ao 'name?' no seu Prisma schema
  name?: string;
}