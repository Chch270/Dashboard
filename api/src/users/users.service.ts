import { Injectable, Inject, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto, CreateUserGoogleDto } from "./create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof User
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll<User>();
    }

    async getUserProfile(id: string) {
        try {
            const user = await this.findOneById(id);
            const retUser = {
                id: user.id,
                username: user.username,
                hasGoogleToken: !!user.google_access_token,
                hasRedditToken: !!user.reddit_access_token,
                hasGithubToken: !!user.github_access_token,
            };
            return retUser;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get user profile: internal error');
        }
    }

    async findOneById(id: string): Promise<User | undefined> {
        if (id === undefined)
            throw new BadRequestException('Invalid user id');
        return this.userRepository.findOne<User>({
            where: {
                id: id,
            }
        })
    }

    async findOneByName(username: string): Promise<User | undefined> {
        if (username === undefined)
            throw new BadRequestException('Invalid user username');
        return this.userRepository.findOne<User>({
            where: {
                username: username,
            }
        })
    }

    async create(user: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        return await this.userRepository.create<User>(user);
    }

    async createFromGoogle(user: CreateUserGoogleDto): Promise<User> {
        const isUserExist = await this.findOneByName(user.username);

        if (isUserExist) {
            throw new BadRequestException('An account from this Google account already exist');
        }
        return await this.userRepository.create<User>(user);
    }

    async delete(id: string): Promise<string> {
        await this.userRepository.destroy<User>({where: { id }})
        return 'User deleted successfully';
    }

    async updateGoogleToken(id: string, token: string): Promise<String> {
        await this.userRepository.update<User>({google_access_token: token}, { where: {id: id} });
        return 'Google token updated successfully';
    }

    async updateRedditToken(id: string, token: string): Promise<String> {
        await this.userRepository.update<User>({reddit_access_token: token}, { where: {id: id} });
        return 'Reddit token updated successfully';
    }

    async updateGithubToken(id: string, token: string): Promise<String> {
        await this.userRepository.update<User>({github_access_token: token}, { where: {id: id} });
        return 'Github token updated successfully';
    }

    async updatePassword(id: string, newPass: string): Promise<String> {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(newPass, salt);
        await this.userRepository.update<User>({password: newPassword}, {where: {id: id}});
        return 'Password updated successfully';
    }
}