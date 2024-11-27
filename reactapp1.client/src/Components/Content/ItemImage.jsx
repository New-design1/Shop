import { useState } from 'react';
import classes from './ItemImage.module.css';

const ItemImage = (props) => {
    const pathToImagesFolder = "../../../src/Images/";
    const [image, setImage] = useState(`url(${pathToImagesFolder + props.images[0]})`)

    return (
        <div className={classes.image} style={{ backgroundImage: image }}>
            {props.images.map((img, i) => (
                <div
                    key={i}
                    className={classes.splitter}
                    onMouseOver={() => setImage(`url(${pathToImagesFolder}${img})`)}
                    onMouseOut={() => setImage(`url(${pathToImagesFolder}${props.images[0]})`)}
                ></div>
            ))}
        </div>
    );
};
export default ItemImage;