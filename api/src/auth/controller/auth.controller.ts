import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Auth Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success Login',
  })
  async login(@Res() response, @Body() loginDto: LoginDto) {
    try {
      const login = await this.authService.login(loginDto);
      return response.status(HttpStatus.OK).json({
        login,
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

  @Post('/register')
  @ApiOperation({ summary: 'Auth Register' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Account created',
  })
  async register(@Res() response, @Body() registerDto: RegisterDto) {
    try {
      const newAccount = await this.authService.register(registerDto);
      return response.status(HttpStatus.CREATED).json(newAccount);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
