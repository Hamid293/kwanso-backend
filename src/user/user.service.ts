import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    const newUser = await new this.userModel(createUserDto).save();
    const { password, ...rest } = newUser.toObject();
    return rest;
  }

  findById(id: string): Promise<Partial<User>> {
    return this.userModel.findById(id).select({ password: false }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}
