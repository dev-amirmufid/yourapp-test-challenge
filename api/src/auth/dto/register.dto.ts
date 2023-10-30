import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '../entity/auth.entity';
import { isUnique } from '@Utils/unique.validator';
import { EqualTo } from '@Utils/equalTo.validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  @isUnique({ tableName: Auth, column: 'username' })
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @isUnique({ tableName: Auth, column: 'email' })
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @EqualTo(RegisterDto, (s) => s.password)
  @ApiProperty()
  readonly confirm_password: string;
}
