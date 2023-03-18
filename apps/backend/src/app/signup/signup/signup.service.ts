import { Injectable } from '@nestjs/common';
import {
  createAccount,
  getUserByEmail,
  updateRefreshToken,
} from '../signup.repository';
import * as argon from 'argon2';
import { SignupDto, serializedUser } from './dtos';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class SignupService {
  constructor(private jwtService: JwtService) {}
  getHello() {
    return 'Hello World!';
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

  async verifyRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      return payload;
    } catch (e) {
      throw new HttpException('Invalid token', 400);
    }
  }

  async signup(dto: SignupDto): Promise<Tokens> {
    //generate salt
    //const salt = await argon.generateSalt();
    //hash password
    const hashedPassword = await argon.hash(dto.password);
    //create account
    const user = await getUserByEmail(dto.email);
    if (user) {
      throw new HttpException('User already exists', 400);
    }

    const response = await createAccount(
      dto.first_name,
      dto.last_name,

      dto.user_address,
      dto.email,
      hashedPassword
    );

    if (response) {
      //return plainToClass(serializedUser, user);
      const tokens = await this.getTokens(response, dto.email);
      await this.updateRtToken(response, tokens.refreshToken);
      return tokens;
    } else throw new HttpException(' User creation failed', 400);
  }

  async updateRtToken(userId: number, rt: string) {
    const hash = await argon.hash(rt);
    const res = await updateRefreshToken(userId, hash);
  }
}
