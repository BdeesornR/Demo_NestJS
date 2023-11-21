import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd',
      database: 'demo_nestjs',
      synchronize: true,
      entities: [Book],
    }),
    TypeOrmModule.forFeature([Book]),
  ],
})
export class BooksModule {}
