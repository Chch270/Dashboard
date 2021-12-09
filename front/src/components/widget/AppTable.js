import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WeatherWidget from 'components/widget/template/WeatherWidget';
import TimeWidget from 'components/widget/template/TimeWidget';
import ShinyWidget from 'components/widget/template/ShinyWidget';
import MailWidget from 'components/widget/template/MailWidget';
import SubWidget from 'components/widget/template/SubWidget';
import StarWidget from 'components/widget/template/StarWidget';
import UptimeWidget from 'components/widget/template/UptimeWidget';


const AppTable = ({ widget, handleWidget }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const mapWidget = {
        "Weather": <WeatherWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />,
        "Time": <TimeWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />,
        "Shiny Pokemon": <ShinyWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />,
        "Mails": <MailWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />,
        "Subs": <SubWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />,
        "Stars": <StarWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />,
        "Update Time": <UptimeWidget param1={widget.param1} param2={widget.param2} timer={widget.refreshTime} />
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOption = (action) => {
        handleWidget(widget, action);
        setAnchorEl(null);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <div>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls="long-menu"
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleOption("modify")}>
                                Modify
                            </MenuItem>
                            <MenuItem onClick={() => handleOption("delete")}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </div>}
                title={widget.type}
                subheader={widget.param1 + (widget.param2 ? ": " + widget.param2 : "")}
            >
            </CardHeader >
            <CardContent>
                {mapWidget[widget.type]}
            </CardContent>
        </Card >
    );
}

export default AppTable