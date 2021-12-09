
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    
    if (user && user.password) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        return {
          id: user.id,
          username: user.username
        };//there you create user object that gonna be store in token
      } else {
        throw new UnauthorizedException('Invalid username or password.');
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async googleLogin(user: any) {
    const isUserExist = await this.usersService.findOneByName(user.username);

    if (isUserExist) {
      await this.usersService.updateGoogleToken(isUserExist.id, user.accessToken);
      return { access_token: this.jwtService.sign({
          username: isUserExist.username,
          sub: isUserExist.id,
        })
      };
    }
    const newUser = await this.usersService.createFromGoogle(user);
    return { access_token: this.jwtService.sign({ newUser: user.username, sub: newUser.id }) };
  }
}
