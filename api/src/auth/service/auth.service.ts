import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { Auth } from '../entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private AuthRepository: MongoRepository<Auth>,
    private jwtService: JwtService,
  ) {}

  /* Get By Id*/
  async login(loginDto: LoginDto): Promise<object> {
    const account = await this.AuthRepository.findOneBy({
      $or: [{ username: loginDto.username }, { email: loginDto.username }],
    });

    if (!account) {
      throw new UnauthorizedException(`Wrong username or password`);
    }

    const isMatch = await bcrypt.compare(loginDto.password, account.password);
    if (!isMatch) {
      throw new UnauthorizedException(`Wrong username or password`);
    }

    const payload = {
      sub: account.id,
      username: account.username,
      email: account.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /* Create */
  async register(registerDto: RegisterDto): Promise<Auth> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerDto.password, saltOrRounds);

    const newAccount = await this.AuthRepository.save({
      username: registerDto.username,
      email: registerDto.email,
      password: hash,
    });
    return newAccount;
  }
}
