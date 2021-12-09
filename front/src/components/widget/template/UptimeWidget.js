import React, { useEffect, useState } from 'react'
import APIWidgets from 'utils/APIWidget'
import APIRequests from 'utils/APIRequest'

const UptimeWidget = ({ param1, param2, timer }) => {
    const [refresh, setRefresh] = useState(0);
    const [push, setPush] = useState([]);
    const [modif, setModif] = useState([]);
    const [create, setCreate] = useState([]);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);

    const getValueData = (data, func) => {
        var tmp = [];
        tmp[0] = data.split('T')[0];
        tmp[1] = data.split('T')[1];
        tmp[1] = tmp[1].substring(0, tmp[1].length - 1);
        func(tmp);
    }

    const callData = async () => {
        try {
            const user = await APIRequests.getUserProfile();
            const res = await APIWidgets.getGithubUpdateTime(param1, param2, user.id);
            getValueData(res.pushed_at, setPush);
            getValueData(res.created_at, setCreate);
            getValueData(res.updated_at, setModif);
            setIsError(false);
        } catch (e) {
            setIsError(true);
            setError(e.toString());
        }
    }

    useEffect(() => {
        callData();
        setInterval(() => {
            setRefresh(refresh => refresh + 1);
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param1, param2])

    if (refresh >= timer) {
        setRefresh(0);
        callData();
    }

    return (
        <div>
            <p>Created at: {create[0]}, {create[1]}</p>
            <p>Updated at: {modif[0]}, {modif[1]}</p>
            <p>Pushed at: {push[0]}, {push[1]}</p>
            <p>{isError && error}</p>
        </div>
    )
}

export default UptimeWidget