import { Controller, Get, Post, Query, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from "./auth/auth.service";
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) { }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req, @Res() res) {
    res.user = req.user;
    res.cookie('jwt-google', req.user.google_access_token, { httpOnly: false }).redirect('http://localhost:8080/Home/Settings');
    return;
  }

  @Get('reddit')
  async redditAuth(@Request() req, @Res() res) {
    const url = this.appService.getRedditConnect();
    res.redirect(url);
  }

  @Get('reddit/redirect')
  async redditAuthRedirect(@Request() req, @Res() res) {
    console.log('code:', req.query.code);
    const token = await this.appService.getRedditToken(req.query.code);
    if (token == null) {
      res.redirect('http://localhost:8080/Home/Settings');
      return;
    }
    res.cookie('jwt-reddit', token).redirect('http://localhost:8080/Home/Settings');
    return;
  }

  @Get('github')
  async githubAuth(@Request() req, @Res() res) {
    const url = this.appService.getGithubConnect();
    res.redirect(url);
  }

  @Get('github/redirect')
  async githubAuthRedirect(@Request() req, @Res() res) {
    console.log('code:', req.query.code);
    const token = await this.appService.getGithubToken(req.query.code);
    if (token == null) {
      res.redirect('http://localhost:8080/Home/Settings');
      return;
    }
    res.cookie('jwt-github', token).redirect('http://localhost:8080/Home/Settings');
    return;
  }

  @Get('about.json')
  async about(@Request() req, @Res() res): Promise<JSON> {
    return res.json({
      "client": {
        "host": req.socket.remoteAddress,
      },
      "server": {
        "current_time": Math.floor(new Date().getTime()/1000.0),
        "services": [{
          "name": "weather",
          "widgets": [{
            "name": "city_temperature",
            "description": "Display temperature for a city",
            "params": [{
              "name": "city",
              "type": "string"
            }]
          }]
        }, {
          "name": "time",
          "widgets": [{
            "name": "city_current_time",
            "description": "Display the current time for a city",
            "params": [{
              "name": "continent",
              "type": "string"
            }, {
              "name": "city",
              "type": "string"
            }]
          }]
        }, {
          "name": "reddit",
          "widgets": [{
            "name": "subreddit_number_follow",
            "description": "Display the number of followers for a SubReddit",
            "params": [{
              "name": "subreddit",
              "type": "string",
            }]
          }]
        }, {
          "name": "github",
          "widgets": [{
            "name": "repo_number_stars",
            "description": "Display the number of stars for a Github repository",
            "params": [{
              "name": "owner",
              "type": "string"
            }, {
              "name": "repo",
              "type": "string"
            }]
          }, {
            "name": "repo_time",
            "description": "Display the time when a Github repo has been created, updated and pushed",
            "params": [{
              "name": "owner",
              "type": "string"
            }, {
              "name": "repo",
              "type": "string"
            }]
          }]
        }, {
          "name": "google",
          "widgets": [{
            "name": "number_unread_mails",
            "description": "Display the number of unread mail for user gmail account",
            "params": []
          }]
        }, {
          "name": "pokemon",
          "widgets": [{
            "name": "shiny_pokemons",
            "description": "Display the sprite of shiny pokemons",
            "params": [{
              "name": "pokemon_name",
              "type": "string"
            }]
          }]
        }]
      }
    });
  }
}
