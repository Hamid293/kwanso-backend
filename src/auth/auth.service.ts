import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const { password, ...result } = user;
    return result;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    const payload = { sub: user._id.toString() };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
