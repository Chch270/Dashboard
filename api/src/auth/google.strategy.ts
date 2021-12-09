import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";


@Injectable()
export class GoogleStategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:3000/google/redirect',
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.modify'],
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails } = profile;
        const user = {
            username: emails[0].value,
            google_access_token: accessToken
        }
        done(null, user);
    }
}