import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class RedditService {
    constructor() {}

    async getSubredditNbFollow(token: string, subreddit: string): Promise<number> {
        const url = `https://oauth.reddit.com/r/${subreddit}/about`;
        const config = {
            headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
              'User-agent': 'dev app for school project',
              'Authorization': 'Bearer ' + `${token}`,
            }
        }
        try {
            let result = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(result.data.data.subscribers);
            return result.data.data.subscribers;
        } catch (error) {
            throw new BadRequestException(`Failed to get number of followers for the subreddit ${subreddit}`, error);
        }
    }
}