import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, ValidationPipe, Request, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { caca, CreateUserDto, CreateUserGoogleDto } from "./create-user.dto";
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from "./change-password.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateGithubTokenDto, UpdateGoogleTokenDto, UpdateRedditTokenDto } from "./update-token.dto";
import { JwtService } from "@nestjs/jwt";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        ) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async userProfile(@Request() req) {
        if (!req.user.id)
            throw new BadRequestException('Failed to get profile: invalid token');
        return this.usersService.getUserProfile(req.user.id)
    }

    @Get('user/id')
    findOneById(@Query('id') id: string): Promise<User> {
        return this.usersService.findOneById(id);
    }

    @Get('user/username')
    findOneByName(@Query('username') username: string): Promise<User> {
        return this.usersService.findOneByName(username);
    }

    @Post()
    async create(@Body(ValidationPipe) data: CreateUserDto, @Res() res): Promise<JSON> {
        const isUserExist = await this.usersService.findOneByName(data.username);

        if (isUserExist) {
            throw new BadRequestException('Username already used by an account');
        }
        await this.usersService.create(data);
        return res.status(201).json({ message: 'User created Successfully' });
    }

    @Post('create/google')
    async createGoogle(@Body(ValidationPipe) body: CreateUserGoogleDto, @Res() res): Promise<caca> {
        const isUserExist = await this.usersService.findOneByName(body.username);

        if (isUserExist) {
            await this.usersService.updateGoogleToken(isUserExist.id, body.google_access_token);
            return res.status(200).json({ access_token: this.jwtService.sign({ username: isUserExist.username, sub: isUserExist.id }) });
        }
        const newUser = await this.usersService.createFromGoogle(body);
        return res.status(201).json({ access_token: this.jwtService.sign({ newUser: body.username, sub: newUser.id }) });
    }

    @Delete()
    async delete(@Query('id') id: string, @Res() res): Promise<JSON> {
        const isUserExist = await this.usersService.findOneById(id);

        if (!isUserExist) {
            throw new BadRequestException('This user does not exist.');
        }
        let msg = await this.usersService.delete(id);

        return res.status(200).json({ message: msg });
    }

    @Put('user/updatepassword')
    async updatePassword(@Query('id') id: string, @Body(ValidationPipe) body: ChangePasswordDto, @Res() res): Promise<JSON> {
        const isUserExist = await this.usersService.findOneById(id);

        if (!isUserExist) {
            throw new BadRequestException('This user does not exist.');
        }
        if (!body.oldpassword && isUserExist.password != null) {
            throw new BadRequestException('Fiel oldpassword is missing');
        }
        if (body.oldpassword && isUserExist.password) {
           const match = await bcrypt.compare(body.oldpassword, isUserExist.password);
            if (!match) {
                throw new BadRequestException('Invalid oldpassword.');
            }
        }
        const msg = await this.usersService.updatePassword(isUserExist.id, body.newpassword);
        return res.status(200).json({ message: msg });
    }

    @Put('update_google_token')
    @UseGuards(JwtAuthGuard)
    async updateGoogleToken(@Request() req, @Body(ValidationPipe) body : UpdateGoogleTokenDto): Promise<String> {
        const isUserExist = await this.usersService.findOneById(req.user.id);

        if (!isUserExist) {
            throw new BadRequestException('This user does not exist.');
        }
        return this.usersService.updateGoogleToken(isUserExist.id, body.google_access_token);
    }

    @Put('update_reddit_token')
    @UseGuards(JwtAuthGuard)
    async updateRedditToken(@Request() req, @Body(ValidationPipe) body : UpdateRedditTokenDto): Promise<String> {
        const isUserExist = await this.usersService.findOneById(req.user.id);

        if (!isUserExist) {
            throw new BadRequestException('This user does not exist.');
        }
        return this.usersService.updateRedditToken(isUserExist.id, body.reddit_access_token);
    }

    @Put('update_github_token')
    @UseGuards(JwtAuthGuard)
    async updateGithubToken(@Request() req, @Body(ValidationPipe) body : UpdateGithubTokenDto): Promise<String> {
        const isUserExist = await this.usersService.findOneById(req.user.id);

        if (!isUserExist) {
            throw new BadRequestException('This user does not exist.');
        }
        return this.usersService.updateGithubToken(isUserExist.id, body.github_access_token);
    }
}