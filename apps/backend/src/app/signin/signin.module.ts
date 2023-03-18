import { GoogleStrategy } from '../Utils/GoogleAuth/GoogleStrategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AtGuard } from '../Utils/Guards';
import { SigninController } from './signin/signin.controller';
import { SigninService } from './signin/signin.service';
import { SessionSerializer } from './signin/Serializer/Serializer';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SigninController],
  providers: [
    GoogleStrategy,
    SigninService,
    SessionSerializer,
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
  ],
})
export class SigninModule {}
