import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export class AddressDto {
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  zip_code: string;
  @IsNotEmpty()
  country: string;
}
