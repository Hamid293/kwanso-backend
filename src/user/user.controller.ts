import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './model/user.model';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, type: User, description: 'Registers a new User' })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async find(@Request() req: any) {
    const user = await this.userService.findById(req.user.userId);
    return { user };
  }
}
