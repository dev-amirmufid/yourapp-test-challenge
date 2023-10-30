import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Res,
  Param,
  HttpStatus,
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

@ApiBearerAuth()
@ApiTags('Users')
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
  async getProfile(@Res() response) {
    try {
      const existingUser = await this.usersService.getAllUsers();
      return response.status(HttpStatus.OK).json(existingUser);
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
  async createProfile(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      console.log(err);
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
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateUser(
        id,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
