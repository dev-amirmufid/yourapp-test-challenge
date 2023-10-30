import { getAge, getHoroscope, getZodiac } from '@Utils/dates.helper';
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { AuthGuard } from '@/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/getProfile')
  @ApiOperation({ summary: 'Get Profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile has been found',
    type: GetUserDto,
  })
  async getProfile(@Res() response, @Req() request) {
    const user = request.user;
    try {
      const userData = await this.usersService.getUser(user.sub);

      const age = getAge(userData.birthday);

      return response.status(HttpStatus.OK).json({
        zodiac: getZodiac(userData.birthday),
        hosorsope: getHoroscope(userData.birthday),
        age: age,
        ...userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/createProfile')
  @ApiOperation({ summary: 'Create Profile' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Profile has been create',
  })
  async createProfile(
    @Res() response,
    @Req() request,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = request.user;
    try {
      const newUser = await this.usersService.createUser(
        user.sub,
        createUserDto,
      );
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/updateProfile')
  @ApiOperation({ summary: 'Update Profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile has been updated',
  })
  async updateProfile(
    @Res() response,
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = request.user;
    try {
      const existingUser = await this.usersService.updateUser(
        user.sub,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json(existingUser);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
