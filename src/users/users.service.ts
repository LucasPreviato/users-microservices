import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/mongo/mongo.users.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const user = await this.userRepository.create(newUser);
    return {
      ...user,
      password: undefined,
    };
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser;
  }
}
