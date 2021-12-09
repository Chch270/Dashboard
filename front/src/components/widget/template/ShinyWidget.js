import React, { useEffect, useState } from 'react'
import APIWidgets from 'utils/APIWidget'
import './widget.css'

const ShinyWidget = ({ param1, param2, timer }) => {
    const [url, setUrl] = useState(false);
    const [shiny, setShiny] = useState('');
    const [refresh, setRefresh] = useState(0);

    const callData = async () => {
        try {
            const res = await APIWidgets.getPokemonShiny(param1);
            setShiny(res);
            setUrl(true);
        } catch (e) {
            setUrl(false);
            setShiny(e.toString());
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
            {url ? <img
                className="shiny"
                src={shiny}
                srcSet={shiny}
                alt={param1}
                loading="lazy"
            />
                :
                <p>{shiny}</p>}
        </div>
    )
}

export default ShinyWidget