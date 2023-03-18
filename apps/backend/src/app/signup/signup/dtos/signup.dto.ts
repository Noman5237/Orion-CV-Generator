import { Exclude, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { serializeUser } from 'passport';
import { AddressDto } from './signupAddress.dto';
export class SignupDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmptyObject()
  user_address: AddressDto;
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
