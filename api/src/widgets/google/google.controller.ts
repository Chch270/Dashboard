import { BadRequestException, Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import { GoogleService } from "./google.service";

@Controller('widgets/google')
export class GoogleController {
    constructor(
        private readonly googleService: GoogleService,
        private readonly usersService: UsersService,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getNbUnreadMails(@Request() req): Promise<number> {
        const user = await this.usersService.findOneById(req.user.id);

        if (!user) {
            throw new BadRequestException(`Request failed: invalid user_id`);
        }
        if (!user.google_access_token)
            throw new BadRequestException('Request failed: account not linked with google');
        return this.googleService.getNbunreadMail(user.google_access_token);
    }
}