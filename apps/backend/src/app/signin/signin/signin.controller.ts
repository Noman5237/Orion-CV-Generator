import { RtGuard } from './../../Utils/Guards/rt.guard';
import { Tokens } from './../../signup/signup/types/tokens.type';
import { SigninService } from './signin.service';
import {
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  HttpCode,
  Request,
} from '@nestjs/common';
import { GoogleAuthGuard } from '../../Utils/Guards/Guard';
import { SignInDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from '../../Utils/Decorators';

@Controller('auth')
export class SigninController {
  constructor(private SignInService: SigninService) {}
  @Public()
  @Get('google/signin')
  @UseGuards(GoogleAuthGuard)
  googleSignIn() {
    return 'handleSignIn';
  }

  @Public()
  @Get('hello')
  @UseGuards(GoogleAuthGuard)
  hello() {
    return 'hello';
  }

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleSignInRedirect() {
    return 'handleSignInRedirect';
  }
  @Public()
  @Post('signin')
  @HttpCode(200)
  signin(@Body() dto: SignInDto): Promise<Tokens> {
    return this.SignInService.signin(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(200)
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string
  ) {
    //@Request() req
    // const user = req.user;
    //return this.SignInService.refresh(user['sub'], user['refreshToken']);

    return this.SignInService.refresh(userId, refreshToken);
  }
}
