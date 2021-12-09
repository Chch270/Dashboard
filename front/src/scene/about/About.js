import React, { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
    const [content, setContent] = useState({});

    const getData = () => {
        axios.get("http://localhost:3000/about.json")
            // .then(function(res) {
            //     res.json();
            // })
            .then(function(json) {
                console.log(json.data);
                setContent(json.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getData();
    });
    return (
        <div><pre>{JSON.stringify(content, null, 2)}</pre></div>
    );
}

export default About