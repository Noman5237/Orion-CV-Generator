import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from '../Utils/Strategies';
import { SignoutController } from './signout/signout.controller';
import { SignoutService } from './signout/signout.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SignoutController],
  providers: [SignoutService, AtStrategy, RtStrategy],
})
export class SignoutModule {}
