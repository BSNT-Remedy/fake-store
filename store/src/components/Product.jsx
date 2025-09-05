import "../css/Product.css"
import { useCart } from "../contexts/CartContext";
import { useLocation } from "react-router-dom"

function Product({product}) {

    const {addToCart, removeFromCart} = useCart();
    const location = useLocation();

    return <div className="product-container">
        <div className="product-image">
            <img src={product.images[0]}/>
        </div>
        <div className="product-details">
            <p>{product.title}</p>
            <p>${product.price}</p>

            <button onClick={() => addToCart(product)}>+</button>
        </div>
    </div>
}

export default Product;