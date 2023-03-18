import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
