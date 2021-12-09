import React, { useEffect, useState } from 'react'
import APIWidgets from 'utils/APIWidget'

const WeatherWidget = ({ param1, param2, timer }) => {
    const [weather, setWeather] = useState('');
    const [refresh, setRefresh] = useState(0);

    const callData = async () => {
        try {
            const res = await APIWidgets.getWeather(param1);
            setWeather(res);
        } catch (e) {
            setWeather(e.toString());
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
            <p>{weather}°C</p>
        </div>
    )
}

export default WeatherWidget