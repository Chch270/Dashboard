import { BadRequestException, Body, Controller, Get, Param, Query } from "@nestjs/common";
import { WorldTimeService } from "./world_time.service";

@Controller('widgets/worldtime')
export class WorldTimeController {
    constructor(private readonly worldTimerService: WorldTimeService) {}

    @Get()
    getCityTime(@Query('continent') continent: string, @Query('city') city: string): Promise<string> {
        if (continent === undefined || city === undefined)
            throw new BadRequestException('Invalid city or continent');
        return this.worldTimerService.getTimeCountry(continent, city);
    }
}