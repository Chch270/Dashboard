import { BadRequestException, Inject, Injectable, Options } from "@nestjs/common";
import { CreateWidgetDto, UpdateWidgetDto } from "./create-widget.dto";
import { Widget, widgetType } from "./widget.entity";

@Injectable()
export class WidgetsService {
    constructor(
        @Inject('WIDGET_REPOSITORY')
        private widgetRepository: typeof Widget
        ) {}

        async findAll(): Promise<Widget[]> {
            return await this.widgetRepository.findAll<Widget>();
        }

        async findOneById(id: string): Promise<Widget> {
            if (id === undefined)
                throw new BadRequestException('Invalid widget id');
            return await this.widgetRepository.findOne<Widget>({
                where: {
                    id: id,
                }
            });
        }

        async findAllByType(type: widgetType): Promise<Widget[]> {
            return await this.widgetRepository.findAll<Widget>({
                where: {
                    type: type
                }
            });
        }

        async findAllFromUser(user_id: string): Promise<Widget[]> {
            return await this.widgetRepository.findAll<Widget>({
                where: {
                    user_id: user_id
                }
            });
        }

        async create(widget: CreateWidgetDto): Promise<Widget> {
            if ((widget.type === widgetType["Update Time"]|| widget.type === widgetType.Stars) && !widget.param2)
                throw new BadRequestException('Failed to create github widget: param2 is missing');
            if (widget.type === widgetType.Time && !widget.param2)
                throw new BadRequestException('Failed to create clock widget: param2 is missing');
            return this.widgetRepository.create<Widget>(widget);
        }

        async delete(id: string): Promise<string> {
            await this.widgetRepository.destroy<Widget>({
                where: {
                    id
                },
            });
            return 'Widget deleted successfully';
        }

        async updateWidget(id: string, body: UpdateWidgetDto): Promise<Widget> {
            const obj = await await this.widgetRepository.update<Widget>({
                type: body.type,
                param1: body.param1,
                param2: body.param2,
                refreshTime: body.refreshTime,
            },{
                where: {
                    id: id,
                },
                returning: true,
            });
            return obj[1][0];
        }
}