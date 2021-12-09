import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { widgetsConstants } from "../constants";


@Injectable()
export class WeatherService {
    constructor() { }

    async findWeathCountry(city: string): Promise<number> {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${widgetsConstants.openWeather_api_key}&lang=fr&units=metric`;
        try {
            let result = await axios.get(url);
            console.log(result.data.main.temp);
            return result.data.main.temp;
        } catch (error) {
            console.log(error)
            throw new BadRequestException(`Failed to get weather of the city ${city}`);
        }
    }
}