import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  author: string;
}
