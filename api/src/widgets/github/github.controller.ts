import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { GithubService } from "./github.service";

@Controller('widgets/github')
export class GithubController {
    constructor(
        private readonly githubService: GithubService,
        private readonly userService: UsersService,
    ) {}

    @Get('stars')
    async getRepoNbStars(@Query('owner') owner: string, @Query('repo') repo: string, @Query('user_id') user_id: string): Promise<number> {
        const user = await this.userService.findOneById(user_id);

        if (!user) {
            throw new BadRequestException(`Request failed: invalid user_id`);
        }
        if (!user.github_access_token)
            throw new BadRequestException('Request failed: account not linked with github');
        return this.githubService.getRepoNbStars(user.github_access_token, owner, repo);
    }

    @Get('time')
    async getRepoUpdateTime(@Query('owner') owner: string, @Query('repo') repo: string, @Query('user_id') user_id: string): Promise<JSON> {
        const user = await this.userService.findOneById(user_id);

        if (!user) {
            throw new BadRequestException(`Request failed: invalid user_id`);
        }
        if (!user.github_access_token)
            throw new BadRequestException('Request failed: account not linked with github');
        return this.githubService.getRepoUpdateTime(user.github_access_token, owner, repo);
    }
}