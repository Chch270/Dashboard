import React from "react";
import { useNavigate } from 'react-router-dom';

const Lost = () => {
    const navigate = useNavigate();

    const illegalHome = () => {
        navigate('/');
    }

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }
        }>
            <p>What are you doing step bro ?</p>
            <button onClick={illegalHome}>
                I am a gros bouffon
            </button>
        </div >
    );
}

export default Lost