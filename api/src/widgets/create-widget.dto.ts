import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { widgetType } from "./widget.entity";

export class CreateWidgetDto {
    @IsNotEmpty()
    @IsNumberString()
    user_id: string;

    @IsNotEmpty()
    @IsEnum(widgetType)
    type: widgetType;

    @IsNotEmpty()
    @IsString()
    param1: string;

    param2: string;

    @IsNotEmpty()
    @IsNumberString()
    refreshTime: number
}

export class UpdateWidgetDto {
    @IsNotEmpty()
    @IsEnum(widgetType)
    type: widgetType;

    @IsNotEmpty()
    @IsString()
    param1: string;

    param2: string;

    @IsNotEmpty()
    @IsNumberString()
    refreshTime: number;
}