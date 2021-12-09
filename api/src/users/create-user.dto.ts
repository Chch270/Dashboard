import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { REGEX, MESSAGES } from "src/app.utils";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(24)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MSG})
    password: string;
}

export class CreateUserGoogleDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    google_access_token: string;
}

export class caca {
    @IsNotEmpty()
    @IsString()
    access_token: string;
}