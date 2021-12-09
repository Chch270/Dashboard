import axios from "axios";

var localStorage = require("local-storage");

class APIRequests {

    async Login(username, password) {
        const url = `http://localhost:3000/auth/login?username=${username}&password=${password}`;
        try {
            let result = await axios.post(url, null, null);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to login: ${error.response.data.message}`);
        }
    }

    async Register(username, password) {
        const url = 'http://localhost:3000/users';
        try {
            let result = await axios.post(url, {
                "username": username,
                "password": password
            });
            return result.data;
        } catch (error) {
            throw new Error(`Failed to register: ${error.response.data.message}`);
        }
    }

    async RegisterGoogle(body) {
        const token = {
            username: body.profileObj.email,
            google_access_token: body.accessToken,
        }
        const url = 'http://localhost:3000/users/create/google'
        try {
            let result = await axios.post(url, token);
            return result.data;
        } catch (error) {
            throw new Error('Failed to login with google:' + error)
        }
    };

    async GetUser(token, id) {
        const url = 'http://localhost/users/' + id;

        try {
            let result = await axios.get(url, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
            return result.data;
        } catch (error) {
            throw new Error('Failed to get User: ' + error);
        }
    }

    async getUserProfile() {
        const url = 'http://localhost:3000/users/profile';
        const token = localStorage.get('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        try {
            let result = await axios.get(url, config);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get user infos: ${error.response.data.message}`)
        }
    }

    async getUserWidgets(user_id) {
        const url = 'http://localhost:3000/widgets';
        const config = {
            params: {
                'user_id': user_id,
            }
        }
        try {
            let result = await axios.get(url, config);
            return result.data;
        } catch (error) {
            throw new Error(`Failed to get user's widget: ${error.response.data.message}`);
        }
    }

    async UpdateGoogleToken(googleToken) {
        try {
            const token = localStorage.get('jwt');
            await axios.put('http://localhost:3000/users/update_google_token', { google_access_token: googleToken }, {
                withCredentials: true,
                headers: {
                    Accept: "applicaiotn/json",
                    'Authorization': `Bearer ${token}`,
                    "Content-type": 'application/json',
                    "access-control-allow-credentials": true,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            });
        } catch (error) {
            throw new Error(`Failed to update google token: ${error.response.data.message}`);
        }
    }

    async UpdateRedditToken(redditToken) {
        try {
            const token = localStorage.get('jwt');
            await axios.put('http://localhost:3000/users/update_reddit_token', { reddit_access_token: redditToken }, {
                withCredentials: true,
                headers: {
                    Accept: "applicaiotn/json",
                    'Authorization': `Bearer ${token}`,
                    "Content-type": 'application/json',
                    "access-control-allow-credentials": true,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            });
        } catch (error) {
            throw new Error(`Failed to update reddit token: ${error.response.data.message}`);
        }
    }

    async UpdateGithubToken(googleToken) {
        try {
            const token = localStorage.get('jwt');
            await axios.put('http://localhost:3000/users/update_github_token', { github_access_token: googleToken }, {
                withCredentials: true,
                headers: {
                    Accept: "applicaiotn/json",
                    'Authorization': `Bearer ${token}`,
                    "Content-type": 'application/json',
                    "access-control-allow-credentials": true,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            });
        } catch (error) {
            throw new Error(`Failed to update github token: ${error.response.data.message}`);
        }
    }

    async CreateWidget(user_id, type, param1, param2, refreshTime) {
        const url = `http://localhost:3000/widgets/create`;
        try {
            const res = await axios.post(url, {
                "user_id": user_id,
                "type": type,
                "param1": param1,
                "param2": param2,
                "refreshTime": refreshTime,
            });
            return res.data;
        } catch (error) {
            throw new Error(`Failed to create widget: ${error.response.data.message}`)
        }
    }

    async ModifyWidget(id, type, param1, param2, refreshTime) {
        const url = `http://localhost:3000/widgets?widget_id=${id}`;

        try {
            let params;
            if (param2 === "") {
                params = {
                    "type": type,
                    "param1": param1,
                    "refreshTime": refreshTime,
                }
            } else {
                params = {
                    "type": type,
                    "param1": param1,
                    "param2": param2,
                    "refreshTime": refreshTime,
                }
            }
            const res = await axios.put(url, params);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to modify widget: ${error.response.data.message}`)
        }
    }

    async DeleteWidget(widget_id) {
        const url = `http://localhost:3000/widgets/${widget_id}`;
        try {
            const res = await axios.delete(url, null);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to create widget: ${error.response.data.message}`)
        }
    }

};

export default new APIRequests()