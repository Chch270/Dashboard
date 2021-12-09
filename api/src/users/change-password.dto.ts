import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { REGEX, MESSAGES } from "src/app.utils";

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(24)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MSG})
    newpassword: string;
    oldpassword: string;
}