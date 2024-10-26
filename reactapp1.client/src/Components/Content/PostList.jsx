import React from 'react'
import PostItem from './PostItem'
import classes from './PostList.module.css'


const PostList = ({ addToCart, posts }) => {
    return (
        <div className={classes.postlist }>
            {posts.map((post, index) =>
                <PostItem addToCart={addToCart} number={index + 1} post={post} key={post.id} />
            )}
        </div>
    );
};

export default PostList;