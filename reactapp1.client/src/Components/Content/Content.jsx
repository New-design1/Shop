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

function Content() {
    const [posts, setPosts] = useState([
        //{ id: 1, title: 'Javascriptb', body: 'Description' },
        //{ id: 2, title: 'Javascripte', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 3, title: 'Javascripta', body: 'Description' },
        //{ id: 4, title: 'Javascriptd', body: 'Description' }
    ])

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
        const response = await fetch('https://localhost:7204/Phone/GetAllPhones');
        console.log('fetch worked');
        const data = await response.json();
        setPosts(data);
    }

    return (
        <div className={classes.content}>
            {posts.length !== 0
                ? <PostList remove={removePost} posts={posts} />
                : <div><h1>Posts not find</h1></div>
            }

        </div>
    );
}

export default Content;