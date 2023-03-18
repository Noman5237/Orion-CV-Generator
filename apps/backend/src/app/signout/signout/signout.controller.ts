import { AtGuard } from './../../Utils/Guards/at.guard';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignoutService } from './signout.service';
import { GetCurrentUser, GetCurrentUserId } from '../../Utils/Decorators';

@Controller('auth')
export class SignoutController {
  constructor(private signoutService: SignoutService) {}

  @UseGuards(AtGuard)
  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  signout(@GetCurrentUserId() userId: number) {
    //@Request() req
    //const user = req.user;
    //console.log('user: ', user);

    return this.signoutService.signout(userId);
  }
}
