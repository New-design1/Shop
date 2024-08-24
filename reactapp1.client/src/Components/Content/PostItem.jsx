import React from 'react';
import MyButton from './UI/button/MyButton';
import classes from './PostItem.module.css'

const PostItem = (props) => {

    return (
        <div className={classes.postItem}>
            <div className={classes.postImage}></div>
            <div>
                <div className={classes.postContent}>
                    <strong>{props.number}. {props.post.name}</strong>
                    <div>
                        {props.post.price}
                    </div>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => props.remove(props.post)}>Buy</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;