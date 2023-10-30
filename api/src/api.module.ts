import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users/service/users.service';
import { UsersController } from './users/controller/users.controller';
import { Users } from './users/entity/user.entity';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { Auth } from './auth/entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Auth]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
})
export class ApiModule {}
