import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    const bookEntity = new Book();

    bookEntity.title = createBookDto.title;
    bookEntity.description = createBookDto.description;
    bookEntity.thumbnail = createBookDto.thumbnail;
    bookEntity.author = createBookDto.author;

    return this.bookRepository.save(bookEntity);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number) {
    return this.bookRepository
      .createQueryBuilder()
      .select('bookTable')
      .from(Book, 'bookTable')
      .where('bookTable.id = :id', { id: id })
      .getOne();
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | UpdateResult> {
    const retrievedBook = await this.findOne(id).then((res) => res);

    if (retrievedBook == null) {
      return Promise.reject(new Error('Record Not Found'));
    }

    retrievedBook.title = updateBookDto.title;
    retrievedBook.description = updateBookDto.description;
    retrievedBook.thumbnail = updateBookDto.thumbnail;
    retrievedBook.author = updateBookDto.author;

    return this.bookRepository.update(id, retrievedBook);
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
