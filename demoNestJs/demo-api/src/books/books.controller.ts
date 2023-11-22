import {
  Res,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';
import { ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/local-auth.guard';
import { Roles } from 'src/decorators/role-guard.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Roles('user')
  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .json(await this.booksService.create(createBookDto));
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
    description: 'ID to retrieve record',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
