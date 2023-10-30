import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isUnique } from '@Utils/uniqueValidator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  @isUnique({ tableName: 'auth', column: 'username' })
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @isUnique({ tableName: 'auth', column: 'email' })
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @Matches('password')
  @ApiProperty()
  readonly confirm_password: string;
}
