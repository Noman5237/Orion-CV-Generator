import { Exclude, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { serializeUser } from 'passport';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class serializedUser {
  first_name: string;
  last_name: string;
  email: string;
  @Exclude()
  password: string;
  constructor(partials: Partial<serializedUser>) {
    Object.assign(this, partials);
  }
}
