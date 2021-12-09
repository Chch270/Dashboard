import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import RandomPics from 'components/RandomImage';
import logo from 'components/assets/logo.svg';
import { GoogleLogin } from 'react-google-login';
import { Constants } from 'config';
import APIRequests from 'utils/APIRequest';

var localStorage = require("local-storage");

const responseGoogle = (response) => {
    console.log(response);
}

const Login = () => {
    const navigate = useNavigate();
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    async function loginHome() {
        setErrorMsg('');
        setHasError(false);
        try {
            let res = await APIRequests.Login(username, password);
            localStorage.set('jwt', res.access_token);
            navigate('/Home');
        } catch (error) {
            setErrorMsg(error.message);
            setHasError(true);
        }
    }

    async function loginGoogle(data) {
        setErrorMsg('');
        setHasError(false);
        try {
            let res = await APIRequests.RegisterGoogle(data);
            localStorage.set('jwt', res.access_token);
            navigate('/Home');
        } catch (error) {
            setErrorMsg(error.message);
            setHasError(true);
        }
    }

    useEffect(() => {
        if (localStorage.get('jwt') && localStorage.get('jwt') !== '') {
            navigate('/Home');
        }
    }, [])

    return (
        <div className="login">
            <div className="login_left">
                <img src={logo} className="login_logo" alt="logo" />
                <h1>
                    Welcome to Dashboard !
                </h1>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {hasError && <ErrorComponent></ErrorComponent>}
                    <GoogleLogin
                        clientId={Constants.googleClientID}
                        buttonText="Login"
                        onSuccess={loginGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={username}
                        onChange={(event) => { setUser(event.target.value); }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value); }}
                    />
                    <h3 style={{ display: 'flex' }}>
                        <Link to="/Register">
                            <li style={{ listStyle: 'none' }}>Create an account</li>
                        </Link>
                    </h3>
                    <Button
                        onClick={loginHome}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </div>
            <div className="login_right">
                <RandomPics />
            </div>
        </div>
    )

    function ErrorComponent() {
        return <h3 style={{ color: 'red' }}>{errorMsg}</h3>
    }
}

export default Login