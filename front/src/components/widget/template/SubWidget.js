import React, { useEffect, useState } from 'react'
import APIWidgets from 'utils/APIWidget'

const SubWidget = ({ param1, param2, timer }) => {
    const [refresh, setRefresh] = useState(0);
    const [data, setData] = useState('');

    const callData = async () => {
        try {
            const res = await APIWidgets.getRedditFollow(param1);//param2 => user_id for token
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
            <p>{data} members !</p>
        </div>
    )
}

export default SubWidget