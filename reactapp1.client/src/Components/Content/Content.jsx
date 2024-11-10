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
import ItemCard from './ItemCard';

const Content = (props) => {
    const [items, setItems] = useState([])

    const createPost = (newPost) => {
        setItems([...items, newPost])
    }
    
    const removePost = (post) => {
        setItems(items.filter(p => p.id !== post.id))
    }

    useEffect(() => { fetchPosts() }, [])

    async function fetchPosts() {
        const response = await fetch('https://localhost:7204/Phone/GetAllPhones');
        console.log('fetch worked');
        const data = await response.json();
        setItems(data);
    }

    return (
        <div className={classes.Content}>
            {items.length !== 0
            ?   (
                    items.map((item) =>
                        <ItemCard addToCart={props.addToCart} item={item} key={item.id } />
                    )
                )
            : 
                <span style={{ margin: "auto" }}> <Loader type="box-rectangular" bgColor={"#212529"} color={"#212529"} size={100} />  </span> 
            }
        </div>
    
    );
}

export default Content;