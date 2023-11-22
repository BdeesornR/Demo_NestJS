import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const userEntity = new User();

    userEntity.username = createUserDto.username;
    userEntity.password = createUserDto.password;
    userEntity.role = createUserDto.role;

    return this.userRepository.save(userEntity);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .select('userEntity')
      .from(User, 'userEntity')
      .where('userEntity.username = :username', { username: username })
      .getOne();
  }

  async update(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | UpdateResult> {
    const retrievedUser = await this.findOne(username).then((res) => res);

    if (retrievedUser == null) {
      return Promise.reject(new Error('Record Not Found'));
    }

    retrievedUser.username = updateUserDto.username;
    retrievedUser.password = updateUserDto.password;
    retrievedUser.role = updateUserDto.role;

    return this.userRepository.update(retrievedUser.id, retrievedUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
