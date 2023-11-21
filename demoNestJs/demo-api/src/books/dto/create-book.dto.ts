import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  title: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  author: string;
}
