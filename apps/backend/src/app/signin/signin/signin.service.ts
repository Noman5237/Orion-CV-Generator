import { GoogleUserDetails } from './types/GoogleUserDetails';
import { HttpException } from '@nestjs/common/exceptions';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import {
  getAccount,
  getAccountId,
  updateRefreshToken,
  createGoogleAccount,
} from '../signin.repository';
import { serializedUser, SignInDto } from './dtos/signin.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
@Injectable()
export class SigninService {
  constructor(private jwtService: JwtService) {}
  async signin(dto: SignInDto): Promise<Tokens> {
    //find the user by email
    const user = await getAccount(dto.email);
    //if the user does not exist throw an error

    if (!user) throw new HttpException('User credential incorrect', 400);
    //compare the password

    const pwMatch = await argon.verify(user.password, dto.password);

    //if the password is incorrect throw an error
    if (!pwMatch) throw new HttpException('User credential incorrect', 400);
    //generate a jwt token
    const tokens = await this.getTokens(user.id, user.email);
    //update the refresh token
    await this.updateRtToken(user.id, tokens.refreshToken);
    //return the token
    return tokens;
    //else return plainToClass(serializedUser, user);
  }

  async updateRtToken(userId: number, rt: string) {
    const hash = await argon.hash(rt);
    const res = await updateRefreshToken(userId, hash);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: 'at-secretKey',
          expiresIn: '15m',
        }
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: 'rt-secretKey',
          expiresIn: '7d',
        }
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async refresh(userId: number, rt: string) {
    const user = await getAccountId(userId);

    if (!user || !user.refresh_token)
      throw new HttpException('User credential incorrect', 400);
    const rtMatch = await argon.verify(user.refresh_token, rt);
    if (!rtMatch) throw new HttpException('User credential incorrect', 400);
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async googleSignIn(req) {
    if (!req.user) {
      throw new HttpException('User credential incorrect', 400);
    }
    const user = await getAccount(req.user.email);
    if (!user) {
      throw new HttpException('User credential incorrect', 400);
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async googleSignInValidate(details: GoogleUserDetails) {
    const user = await getAccount(details.email);
    if (user) {
      console.log(user.id);
      return user;
    }
    if (!user) {
      const id = await createGoogleAccount(details);
    }

    // const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRtToken(user.id, tokens.refreshToken);
    // return tokens;
    console.log(details);
  }

  async getAccountById(id: number) {
    const user = await getAccountId(id);
    return user;
  }
}
