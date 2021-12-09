import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import 'components/assets/logo.svg';
import APIRequests from 'utils/APIRequest';
import RandomPics from 'components/RandomImage.js';
import logo from 'components/assets/logo.svg';
import './Register.css';

export function Register() {
    let navigate = useNavigate();
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    async function registerNewUser() {
        setErrorMsg('');
        setHasError(false);
        if (password !== confirm) {
            setErrorMsg('Password and confirmation password are differents');
            setHasError(true);
            return;
        }
        try {
            await APIRequests.Register(username, password);
            navigate('/');
        } catch (error) {
            setHasError(true);
            setErrorMsg(error.message);
        }
    }

    return (
        <div className="register">
            <div className="register_left">
                <img src={logo} className="register_logo" alt="logo" />
                <h1>
                    Register
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
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value); }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="Confirm Password"
                        autoComplete="current-password"
                        value={confirm}
                        onChange={(event) => { setConfirm(event.target.value); }}
                    />
                    <Button
                        onClick={registerNewUser}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        component="Link" to="/"
                    >
                        Register
                    </Button>
                </Box>
            </div>
            <div className="register_right">
                <RandomPics />
            </div>
        </div>
    )

    function ErrorComponent() {
        return <h3 style={{ color: 'red' }}>{errorMsg}</h3>
    }
}

export default Register