import React, { useEffect, useState } from "react";
import UpBar from 'components/UpBar'
import Lost from "scene/lost/Lost";
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import RedditIcon from '@mui/icons-material/Reddit';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Settings.css';
import APIRequest from "utils/APIRequest";
import { useNavigate } from 'react-router';

var localStorage = require("local-storage");

const Settings = () => {
    var loginToken = localStorage.get('jwt');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const disconnectUser = () => {
        localStorage.set('jwt', '');
        navigate('/');
    }

    const getUserWithFetch = async () => {
        try {
            const user = await APIRequest.getUserProfile();
            setUserData(user);
        } catch (error) {
            setErrorMsg(error.message);
            setHasError(true);
        }
    };

    const updateGoogleToken = async () => {
        const googleToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt-google\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (googleToken) {
            try {
                await APIRequest.UpdateGoogleToken(googleToken);
                document.cookie = 'jwt-google=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                setUserData(prevUser => {
                    return {
                        ...prevUser,
                        hasGoogleToken: true
                    }
                })
            } catch (error) {
                setHasError(true);
                setErrorMsg(error);
            }
        }
    };

    const updateRedditToken = async () => {
        let redditToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt-reddit\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (redditToken) {
            try {
                await APIRequest.UpdateRedditToken(redditToken);
                document.cookie = 'jwt-reddit=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                setUserData(prevUser => {
                    return {
                        ...prevUser,
                        hasRedditToken: true
                    }
                })
            } catch (error) {
                setHasError(true);
                setErrorMsg(error);
            }
        }
    };

    const updateGithubToken = async () => {
        let githubToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt-github\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (githubToken) {
            try {
                await APIRequest.UpdateGithubToken(githubToken);
                document.cookie = 'jwt-github=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                setUserData(prevUser => {
                    return {
                        ...prevUser,
                        hasGithubToken: true
                    }
                })
            } catch (error) {
                setHasError(true);
                setErrorMsg(error);
            }
        }
    }

    const logoutGoogle = async () => {
        try {
            await APIRequest.UpdateGoogleToken(null);
            setUserData(prevUser => {
                return {
                    ...prevUser,
                    hasGoogleToken: false
                }
            })
        } catch (error) {
            setHasError(true);
            setErrorMsg(error);
        }
    }

    const logoutReddit = async () => {
        try {
            await APIRequest.UpdateRedditToken(null);
            setUserData(prevUser => {
                return {
                    ...prevUser,
                    hasRedditToken: false
                }
            })
        } catch (error) {
            setHasError(true);
            setErrorMsg(error);
        }
    }

    const logoutGithub = async () => {
        try {
            await APIRequest.UpdateGithubToken(null);
            setUserData(prevUser => {
                return {
                    ...prevUser,
                    hasGithubToken: false
                }
            })
        } catch (error) {
            setHasError(true);
            setErrorMsg(error);
        }
    }

    useEffect(() => {
        getUserWithFetch();
        updateGoogleToken();
        updateRedditToken();
        updateGithubToken();
    }, [])

    if (!loginToken) {
        return (<Lost />);
    }

    return (
        <div>
            <UpBar />
            <Box className='settings'>
                <Avatar alt='Profil Pic' src='https://m.media-amazon.com/images/I/51e6kpkyuIL._AC_SL1200_.jpg' sx={{ width: 200, height: 200 }} />
                <h1>{userData.username}</h1>
                <Stack direction="column" spacing={2}>
                    <Button className='button' variant="outlined">
                        Change Username
                    </Button>
                    <Button className='button' variant="outlined">
                        Change Password
                    </Button>
                </Stack>
            </Box>
            {hasError && <p>{errorMsg}</p>}
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <RedditIcon />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap>Connection to Reddit</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" href={userData.hasRedditToken ? "" : "http://localhost:3000/reddit"} onClick={userData.hasRedditToken ? logoutReddit : updateRedditToken} >
                                {userData.hasRedditToken ? "Disconnect" : "Connect"}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <GoogleIcon />
                        </Grid>
                        <Grid item xs>
                            <Typography noWrap>Connection to Google</Typography>
                        </Grid>
                        <Button variant="outlined" href={userData.hasGoogleToken ? "" : "http://localhost:3000/google"} onClick={userData.hasGoogleToken ? logoutGoogle : updateGoogleToken}>
                            {userData.hasGoogleToken ? "Disconnect" : "Connect"}
                        </Button>
                    </Grid>
                </Paper>
                <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <GitHubIcon />
                        </Grid>
                        <Grid item xs>
                            <Typography>Connection to Github</Typography>
                        </Grid>
                        <Button variant="outlined" href={userData.hasGithubToken ? "" : "http://localhost:3000/github"} onClick={userData.hasGithubToken ? logoutGithub : updateGithubToken}>
                            {userData.hasGithubToken ? "Disconnect" : "Connect"}
                        </Button>
                    </Grid>
                </Paper>
            </Box>
            <Box className='settings'>
                <Stack direction="column" spacing={2}>
                    <Button className='button' variant="outlined" onClick={disconnectUser}>
                        Disconnect
                    </Button>
                </Stack>
            </Box>
        </div >
    );
}

export default Settings