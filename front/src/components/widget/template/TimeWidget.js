import React, { useEffect, useState } from 'react'
import APIWidgets from 'utils/APIWidget'

const TimeWidget = ({ param1, param2, timer }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState(0);
    const [refresh, setRefresh] = useState(0);

    const callData = async () => {
        try {
            var res = await APIWidgets.getTime(param1, param2);
            res = res.split('T');
            setDate(res[0]);
            res = res[1].split('.');
            setTime(res[0]);
        } catch (e) {
            setTime(e.toString());
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
            <p>{date}</p>
            <p>{time}</p>
        </div>
    )
}

export default TimeWidget