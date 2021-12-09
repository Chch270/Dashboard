import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '@material-ui/core';
import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const UpBar = () => {
    const navigate = useNavigate();

    const returnHome = () => {
        navigate('/Home');
    }

    const returnSettings = () => {
        navigate('/Home/Settings');
    }

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <Button color="inherit" onClick={returnHome}>
                    <Typography variant="h6">
                        Dashboard
                    </Typography>
                </Button>
                <Button color="inherit" onClick={returnSettings}>
                    Settings
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default UpBar