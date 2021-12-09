import { Injectable } from '@nestjs/common';
import axios from 'axios';
const qs = require('qs');
const querystring = require('querystring');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello wiwi!';
  }

  getRedditConnect(): string {
    const url = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=a&redirect_uri=http://localhost:3000/reddit/redirect&duration=permanent&scope=identity edit history mysubreddits privatemessages read save submit subscribe vote account`;
    return url;
  }

  async getRedditToken(code: string): Promise<String> {
    if (!code)
      return null;
    const url = `https://www.reddit.com/api/v1/access_token`;
    try {
      const mdp = `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`;
      const auth = Buffer.from(mdp, 'binary').toString('base64');
      const res = await axios.post(url, querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/reddit/redirect',
      }), {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'school projet',
        },
      });
      console.log('res:', res.data.access_token);
      if (res.data.access_token)
        return res.data.access_token;
      return null;
    } catch (error) {
      console.log('error:',error.message, error);
      return null;
    }
  }

  getGithubConnect(): string {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&response_type=code&state=github&redirect_uri=http://localhost:3000/github/redirect&scope=repo`;
    return url;
  }

  async getGithubToken(code: string): Promise<String> {
    if (!code)
      return null;
    const url = `https://github.com/login/oauth/access_token`;
    try {
      const res = await axios.post(url, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code: code,
      redirect_uri: 'http://localhost:3000/github/redirect',
      }, {
        headers: {
          Accept: 'application/json',
        }
      });
      console.log(res.data.access_token);
      if (res.data.access_token)
        return res.data.access_token;
      return null;
    } catch (error) {
      console.log('error:',error.message, error);
      return null;
    }
  }
}
