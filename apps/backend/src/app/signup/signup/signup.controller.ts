import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { Public } from '../../Utils/Decorators';
import { SignupDto } from './dtos';

import { SignupService } from './signup.service';
import { Tokens } from './types';
@Controller('auth')
export class SignupController {
  constructor(private SignupService: SignupService) {}
  @Get('')
  @Public()
  signup() {
    return this.SignupService.getHello();
  }
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signupPost(@Body() dto: SignupDto): Promise<Tokens> {
    return this.SignupService.signup(dto);
  }
}
