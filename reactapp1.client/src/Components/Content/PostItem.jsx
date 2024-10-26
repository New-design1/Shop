import React from 'react';
import MyButton from './UI/button/MyButton';
import classes from './PostItem.module.css'
import ItemImage from './ItemImage'

const PostItem = (props) => {

    return (
        <div className={classes.postItem}>
                <ItemImage images = {props.post.images} />
            <div>
                <div className={classes.postContent}>
                    <strong>{props.post.name}</strong>
                    <strong>{props.post.price} ₽</strong>
                </div>
                <div>
                    <MyButton onClick={() => props.addToCart(props.post)}>Купить</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;