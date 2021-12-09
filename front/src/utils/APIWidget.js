import axios from "axios";
var localStorage = require("local-storage");

class APIWidgets {
    async getGithubStar(owner, repo, id) {
        const url = 'http://localhost:3000/widgets/github/stars';
        try {
            let result = await axios.get(url, {
                params: {
                    "owner": owner,
                    "repo": repo,
                    "user_id": id
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get Github stars: ${error.response.data.message}`);
        }
    }

    async getGithubUpdateTime(owner, repo, id) {
        const url = 'http://localhost:3000/widgets/github/time';
        try {
            let result = await axios.get(url, {
                params: {
                    "owner": owner,
                    "repo": repo,
                    "user_id": id
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get Github update time: ${error.response.data.message}`);
        }
    }

    async getGoogleMail() {
        const url = 'http://localhost:3000/widgets/google/';
        const token = localStorage.get('jwt')
        try {
            let result = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get Google mails: ${error.response.data.message}`);
        }
    }

    async getPokemonShiny(name) {
        const url = 'http://localhost:3000/widgets/pokemon/';
        try {
            let result = await axios.get(url, {
                params: {
                    "pokemon_name": name
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get Pokemon shiny: ${error.response.data.message}`);
        }
    }

    async getRedditFollow(subreddit) {
        const url = 'http://localhost:3000/widgets/reddit/';
        const token = localStorage.get('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                "subreddit": subreddit,
            }
        }
        try {
            let result = await axios.get(url, config);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get Subreddit subs: ${error.response.data.message}`);
        }
    }

    async getWeather(city) {
        const url = 'http://localhost:3000/widgets/weather';
        try {
            let result = await axios.get(url, {
                params: {
                    "city": city,
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get weather: ${error.response.data.message}`);
        }
    }

    async getTime(continent, city) {
        const url = 'http://localhost:3000/widgets/worldtime/';
        try {
            let result = await axios.get(url, {
                params: {
                    "continent": continent,
                    "city": city
                }
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get world time: ${error.response.data.message}`);
        }
    }

}

export default new APIWidgets()