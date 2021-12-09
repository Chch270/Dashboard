import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expires_in },
}),],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  exports: [UsersService],
})
export class UsersModule {}
