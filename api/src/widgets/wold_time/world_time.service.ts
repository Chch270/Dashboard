import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class WorldTimeService {
    constructor() {}

    async getTimeCountry(continent: string, city: string): Promise<string> {
        const url = `http://worldtimeapi.org/api/timezone/${continent}/${city}`;
        try {
            let result = await axios.get(url, null);
            console.log(result.data);
            return result.data.datetime;
        } catch (error) {
            throw new BadRequestException(`Failed to get time for the following country "${city} in the following continent "${continent}"`);
        }
    }
}