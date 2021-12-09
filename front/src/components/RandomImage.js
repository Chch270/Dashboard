import React from 'react'

const RandomPics = () => {
    function importAll(r) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('./assets/login_pics', false, /\.(png|jpe?g|svg)$/));

    const GetRandomPics = () => {

        return (Math.floor(Math.random() * images.length));
    }

    console.log(images);

    return (
        <div>
            <img src={images[GetRandomPics()]} className="background" alt="logo" />
        </div>
    );
}

export default React.memo(RandomPics);