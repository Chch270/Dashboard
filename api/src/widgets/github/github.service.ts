import { BadRequestException, Injectable } from "@nestjs/common";
import { Octokit } from "@octokit/core";

@Injectable()
export class GithubService {
    constructor() {}

    async getRepoNbStars(token: string, owner: string, repo: string): Promise<number> {
        try {
            const octokit = new Octokit({ auth: token });
            const response = await octokit.request("GET /repos/{owner}/{repo}", {
                owner: owner,
                repo: repo,
                type: "private",
              });
            console.log(response.data.stargazers_count);
            if (response.data.stargazers_count)
                return (response.data.stargazers_count);
            return 0;
        } catch (error) {
            throw new BadRequestException({message: `Error request failed: ${error}`, statusCode: 404});
        }
    }

    async getRepoUpdateTime(token: string, owner: string, repo: string): Promise<JSON> {
        try {
            const octokit = new Octokit({ auth: token });
            const response = await octokit.request("GET /repos/{owner}/{repo}", {
                owner: owner,
                repo: repo,
                type: "private",
              });
            console.log(response.data);
            return JSON.parse(JSON.stringify({pushed_at: response.data.pushed_at, created_at: response.data.created_at, updated_at: response.data.updated_at}));
        } catch (error) {
            throw new BadRequestException({message: `Error request failed: ${error}`, statusCode: 404});
        }
    }
}