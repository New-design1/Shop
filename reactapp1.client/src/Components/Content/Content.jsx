import classes from './Content.module.css';
import Loader from "react-js-loader";
import ItemCard from './ItemCard';

const Content = (props) => {

    return (
        <div className={classes.Content}>
            {props.items.length !== 0
            ?   (
                    props.items.map((item) =>
                        <ItemCard addToCart={props.addToCart} item={item} key={item.id} />
                    )
                )
            :
                <span style={{ margin: "auto", position: 'relative', top: '300px' }}> <Loader type="box-rectangular" bgColor={"#212529"} color={"#212529"} size={100} />  </span> 
            }
        </div>
    
    );
}

export default Content;