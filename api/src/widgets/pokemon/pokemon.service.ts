import { BadRequestException, Get, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PokemonService {
    constructor() {}

    async getPokeIMageUrl(name: string): Promise<string> {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        try {
            const res = await axios.get(url);
            console.log (res.data.sprites.other.home.front_shiny);
            return res.data.sprites.other.home.front_shiny;
        } catch (error) {
            throw new BadRequestException('Failed to get pokemon image: invalid pokemon name');
        }
    }
}