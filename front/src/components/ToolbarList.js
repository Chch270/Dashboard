import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloudIcon from '@mui/icons-material/Cloud';
import RedditIcon from '@mui/icons-material/Reddit';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

var localStorage = require("local-storage");

const ToolbarList = () => {
    const navigate = useNavigate();

    const LogoutProcess = () => {
        localStorage.remove('jwt');
        navigate('/');
    }

    const SettingsProcess = () => {
        navigate('/Home/Settings');
    }

    return (
        <div>
            <List>
                <ListItem button key={'Weather'}>
                    <ListItemIcon>
                        <CloudIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Weather'} />
                </ListItem>
                <ListItem button key={'Reddit'}>
                    <ListItemIcon>
                        <RedditIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Reddit'} />
                </ListItem>
                <ListItem button key={'Weather'}>
                    <ListItemIcon>
                        <CloudIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Weather'} />
                </ListItem>
                <ListItem button key={'Weather'}>
                    <ListItemIcon>
                        <CloudIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Weather'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={'Parameters'} onClick={SettingsProcess}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Parameters'} />
                </ListItem>
                <ListItem button key={'Log out'} onClick={LogoutProcess}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItem>
            </List>
        </div >
    );
}

export default ToolbarList