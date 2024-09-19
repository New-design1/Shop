import { useEffect, useState, useMemo } from 'react';
import Counter from './Counter';
import PostItem from './PostItem';
import PostList from './PostList';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import PostForm from './PostForm'
import MySelect from './UI/select/MySelect';
import PostFilter from './PostFilter';
import classes from './Content.module.css';
import Loader from "react-js-loader";

function Content() {
    const [posts, setPosts] = useState([])

  /*  const [filter, setFilter] = useState({ sort: '', query: '' });*/

    //const sortedPosts = useMemo(() => {
    //    if (filter.sort) {
    //        return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    //    }
    //    return posts;
    //}, [filter.sort, posts])

    //const sortedAndSearchedPosts = useMemo(() => {
    //    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    //}, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    useEffect(() => { fetchPosts() }, [])

    async function fetchPosts() {
        const response = await fetch('https://localhost:7204/Phone/GetAllPhones', { credentials: "include"});
        console.log('fetch worked');
        const data = await response.json();
        setPosts(data);
    }

    //if (posts.length === 0) {
    //    return (
    //        <div style={{ display: "flex", position: "absolute", height: "100vh", width: "100vw"}} >
    //            <Loader type="spinner-circle" title={"spinner-circle"} size={100} />
    //        </div>
    //    )
    //} 

    return (
        //
        <div className={classes.content}>
            {posts.length !== 0
                ? <PostList remove={removePost} posts={posts} />
            : 
                <Loader type="box-rectangular" bgColor={"#9CC9A3"} color={"#9CC9A3"} size={100} />   
            }
        </div>
    
    );
}

export default Content;