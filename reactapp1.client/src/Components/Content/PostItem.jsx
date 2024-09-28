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
                    <strong>{props.number}. {props.post.name}</strong>
                    <div>
                        {props.post.price}
                    </div>
                </div>
                <div>
                    <MyButton onClick={() => props.remove(props.post)}>Buy</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;