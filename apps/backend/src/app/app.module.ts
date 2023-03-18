import { AtGuard } from './Utils/Guards/at.guard';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { SigninModule } from './signin/signin.module';
import { SignoutModule } from './signout/signout.module';
import { AtStrategy, RtStrategy } from './Utils/Strategies';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './signin/signin/Serializer/Serializer';
import { CvModule } from './cv/cv.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    UserModule,
    SignupModule,
    SigninModule,
    SignoutModule,
    ConfigModule.forRoot({}),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    CvModule,
    AiModule,
  ],
  controllers: [],
  providers: [
    AtStrategy,
    RtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
