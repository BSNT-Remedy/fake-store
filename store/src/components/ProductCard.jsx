import "../css/Product.css"
import React from 'react';
import { useCart } from "../contexts/CartContext";

const ProductCard = React.memo(({product, addToCart}) => {
    console.log("Render: ", product.title)

    // const {addToCart, removeFromCart} = useCart();

    return <div className="product-container">
        <div className="product-image">
            <img src={product.images[0]}/>
        </div>
        <div className="product-details">
            <p>{product.title}</p>
            <h2>${product.price}</h2>
            <button onClick={() => addToCart(product)}>+</button>
        </div>
    </div>
})

export default ProductCard;