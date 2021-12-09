import { IsNotEmpty, IsString } from "class-validator";

export class UpdateGoogleTokenDto {
    google_access_token: string;
}

export class UpdateRedditTokenDto {
    reddit_access_token: string;
}

export class UpdateGithubTokenDto {
    github_access_token: string;
}