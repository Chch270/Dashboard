import { BadRequestException, Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import { RedditService } from "./reddit.service";

@Controller('widgets/reddit')
export class RedditController {
    constructor(
        private readonly redditService: RedditService,
        private readonly usersService: UsersService,
        ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getSubredditNbFollow(@Query('subreddit') subreddit: string, @Request() req): Promise<number> {
        const user = await this.usersService.findOneById(req.user.id);

        if (!user) {
            throw new BadRequestException(`Request failed: invalid user_id caca`);
        }
        if (subreddit === undefined)
            throw new BadRequestException('Invalid subreddit');
        if (!user.reddit_access_token)
            throw new BadRequestException('Request failed: account not linked with reddit');

        return this.redditService.getSubredditNbFollow(user.reddit_access_token, subreddit);
    }
}