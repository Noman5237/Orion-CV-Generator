import { Injectable } from '@nestjs/common';
import { deleteRefreshToken } from '../signout.repository';

@Injectable()
export class SignoutService {
  async signout(userId: number) {
    await deleteRefreshToken(userId);
  }
}
