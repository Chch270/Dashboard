import React, { useState, useEffect } from "react";
import UpBar from 'components/UpBar';
import Lost from 'scene/lost/Lost';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CreationForm from 'components/form/CreationForm';
import APIRequest from "utils/APIRequest";
import ModificationForm from 'components/form/ModificationForm';
import GridWidget from 'components/widget/GridWidget'
import './Home.css'
var localStorage = require("local-storage");

const Home = () => {
    var loginToken = localStorage.get('jwt');
    const [openCreation, setOpenCreation] = useState(false);
    const [openModification, setOpenModification] = useState(false);
    const [snack, setSnack] = useState(false);
    const [snackMod, setSnackMod] = useState(false);
    const [widgetList, setWidgetList] = useState([]);
    const [currWidget, setCurrWidget] = useState({});

    const addWidgetList = e => setWidgetList([...widgetList, e]);

    const handleWidget = (curr, action) => {
        if (action === "modify") {
            setCurrWidget(curr);
            setOpenModification(true);
        } else if (action === "delete") {
            const filtered = widgetList.filter(function (value, index, arr) {
                return value.id !== curr.id;
            });
            APIRequest.DeleteWidget(curr.id);
            setWidgetList(filtered);
        }
    }

    const successCreation = (wid, boulard) => {
        if (boulard) {
            addWidgetList(wid);
        }
        setSnack(boulard);
    }

    const successModification = async (wid, boulard) => {
        if (boulard) {
            const filtered = widgetList.filter(function (value, index, arr) {
                return value.id === wid.id;
            });
            filtered[0].type = wid.type;
            filtered[0].param1 = wid.param1;
            filtered[0].param2 = wid.param2;
            filtered[0].refreshTime = wid.refreshTime;
            try {
                await APIRequest.ModifyWidget(
                    filtered[0].id,
                    filtered[0].type,
                    filtered[0].param1,
                    filtered[0].param2,
                    filtered[0].refreshTime.toString()
                );
                setCurrWidget({});
                setSnackMod(boulard);
            } catch (e) {
                console.log(e);
            }
        }
    }

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    function SlideTransitionMod(props) {
        return <Slide {...props} direction="right" />;
    }

    const getUserWidgetsWithFetch = async () => {
        try {
            const data = await APIRequest.getUserProfile();
            const widgets = await APIRequest.getUserWidgets(data.id)
            setWidgetList(widgets);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserWidgetsWithFetch();
    }, [])

    if (!loginToken) {
        return (<Lost />);
    }
    return (
        <div>
            <UpBar />
            <GridWidget widgetList={widgetList} handleWidget={handleWidget} />
            <div className="addButton">
                <Fab color="primary" aria-label="add" onClick={() => setOpenCreation(true)}>
                    <AddIcon />
                </Fab>
            </div>
            <CreationForm
                open={openCreation}
                handleClose={() => { setOpenCreation(false); }}
                success={successCreation}
            />
            <ModificationForm
                widgetParam={currWidget}
                open={openModification}
                handleClose={() => { setOpenModification(false); }}
                success={successModification}
            />
            <Snackbar
                open={snackMod}
                onClose={() => { setSnackMod(false) }}
                TransitionComponent={SlideTransition}
                message="Widget modified !"
                key={SlideTransitionMod}
            />
            <Snackbar
                open={snack}
                onClose={() => { setSnack(false) }}
                TransitionComponent={SlideTransition}
                message="Widget created !"
                key={SlideTransition}
            />
        </div>
    );
}

export default Home