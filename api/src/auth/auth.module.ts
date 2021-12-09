import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalSrategy } from "./local.strategy";
import { JwtStrategy } from './jwt.strategy';
import { GoogleStategy } from './google.strategy';

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expires_in },
      }),
    ],
  providers: [AuthService, LocalSrategy, JwtStrategy, GoogleStategy],
  exports: [AuthService],
})
export class AuthModule {}
