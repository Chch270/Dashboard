import { Controller, Get, Query } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller('widgets/pokemon')
export class PokemonController {
    constructor(
        private readonly pokemonService: PokemonService,
    ) {}

    @Get()
    async getPokemonImage(@Query('pokemon_name') name: string): Promise<string> {
        return this.pokemonService.getPokeIMageUrl(name);
    }
}