import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateWidgetDto, UpdateWidgetDto } from "./create-widget.dto";
import { Widget } from "./widget.entity";
import { WidgetsService } from "./widgets.service";

@Controller('widgets')
export class WidgetController {
    constructor(
        private readonly widgetsService: WidgetsService,
        private readonly usersService: UsersService,
        ) {}

    @Get()
    findAll(): Promise<Widget[]> {
        return this.widgetsService.findAll();
    }

    @Get()
    findOneById(@Query('id') id: string): Promise<Widget> {
        return this.widgetsService.findOneById(id);
    }

    @Get()
    findAllFromUser(@Query('user_id') user_id: string): Promise<Widget[]> {
        return this.widgetsService.findAllFromUser(user_id);
    }

    @Post('create')
    async createWidget(@Body(ValidationPipe) body: CreateWidgetDto): Promise<Widget> {
        const isUserExist = await this.usersService.findOneById(body.user_id);

        if (!isUserExist) {
            throw new BadRequestException('This user does not exist.');
        }
        return this.widgetsService.create(body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res): Promise<string> {
        const isWidgetExist = await this.widgetsService.findOneById(id);

        if (!isWidgetExist) {
            throw new BadRequestException('This widget does not exist');
        }
        const msg = await this.widgetsService.delete(id);
        return res.status(200).json({ message: msg });
    }

    @Put()
    async updateWidget(@Query('widget_id') widget_id: string, @Body(ValidationPipe) body: UpdateWidgetDto): Promise<Widget> {
        const isWidgetExist = await this.widgetsService.findOneById(widget_id);

        if (!isWidgetExist) {
            throw new BadRequestException('This widget does not exist');
        }
        return this.widgetsService.updateWidget(widget_id, body);
    }
}