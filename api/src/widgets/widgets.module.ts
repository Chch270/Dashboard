import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsersModule } from "src/users/users.module";
import { GithubController } from "./github/github.controller";
import { GithubService } from "./github/github.service";
import { GoogleController } from "./google/google.controller";
import { GoogleService } from "./google/google.service";
import { PokemonController } from "./pokemon/pokemon.controller";
import { PokemonService } from "./pokemon/pokemon.service";
import { RedditController } from "./reddit/reddit.controller";
import { RedditService } from "./reddit/reddit.service";
import { WeatherController } from "./weather/weather.controller";
import { WeatherService } from "./weather/weather.service";
import { WidgetController } from "./widgets.controller";
import { widgetProviders } from "./widgets.providers";
import { WidgetsService } from "./widgets.service";
import { WorldTimeController } from "./wold_time/wold_time.controller";
import { WorldTimeService } from "./wold_time/world_time.service";

@Module({
    imports: [DatabaseModule, HttpModule, UsersModule],
    controllers: [
        WidgetController,
        WeatherController,
        WorldTimeController,
        RedditController,
        GithubController,
        PokemonController,
        GoogleController,
    ],
    providers: [
        WidgetsService,
        ...widgetProviders,
        WeatherService,
        WorldTimeService,
        RedditService,
        GithubService,
        PokemonService,
        GoogleService,
    ],
    exports: [
        WidgetsService,
        WeatherService,
        WorldTimeService,
        RedditService,
        GithubService,
        PokemonService,
        GoogleService,
    ],
})
export class WidgetsModule {}