
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly mongo: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.mongo(user);
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    const users = await this.mongo.find().exec();
    return users;
  }
  async findOne(email: string): Promise<User> {
    const user = await this.mongo.findOne({ email }).exec();
    return user;
  }
  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.mongo.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  }
  async delete(id: string): Promise<User> {
    const deletedUser = await this.mongo.findByIdAndRemove(id);
    return deletedUser;
  }
}
