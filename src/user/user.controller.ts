import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:email')
  async findMe(@Param('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user/:id')
  async update(@Param('id') userId: number, @Body() userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = this.userService.generateJWT(_user);
    const { email, username, bio, image } = _user;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
