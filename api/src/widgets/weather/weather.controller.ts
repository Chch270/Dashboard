import { Controller, Get, Param, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller('widgets/weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @Get()
    getCityWeather(@Query('city') city: string): Promise<number> {
        return this.weatherService.findWeathCountry(city);
    }
}