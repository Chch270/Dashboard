import React, { useEffect, useState } from 'react'
import APIWidgets from 'utils/APIWidget'
import APIRequests from 'utils/APIRequest'

const StarWidget = ({ param1, param2, timer }) => {
    const [data, setData] = useState('');
    const [refresh, setRefresh] = useState(0);

    const callData = async () => {
        try {
            const user = await APIRequests.getUserProfile();
            const res = await APIWidgets.getGithubStar(param1, param2, user.id);
            setData(res);
        } catch (e) {
            setData(e.toString());
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
            <p>{data} stars !</p>
        </div>
    )
}

export default StarWidget