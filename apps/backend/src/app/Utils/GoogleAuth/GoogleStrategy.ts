import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { SigninService } from '../../signin/signin/signin.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private SignInService: SigninService) {
    super({
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:3333/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails } = profile;
    console.log(profile, accessToken, refreshToken);
    const user = {
      oauth_id: profile.id,

      first_name: name.givenName,
      last_name: name.familyName,
      email: emails[0].value,
    };
    const res = await this.SignInService.googleSignInValidate(user);
    console.log('Rsponse', res);
    return res || null;
  }
}
