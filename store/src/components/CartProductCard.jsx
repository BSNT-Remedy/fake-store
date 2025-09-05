import "../css/CartProductCard.css"
import { useCart } from "../contexts/CartContext";

function CartProductCard({product, isCart = false}) {

    const {addToCart, removeFromCart} = useCart();

    return <div className="cart-product-container">
        <div className="cart-product-image">
            <img src={product.images[0]}/>
        </div>
        <div className="cart-product-details">
            <p>{product.title}</p>
            <p>${product.price}</p>

            {isCart ? (
                <button onClick={() => removeFromCart(product.id)}>remove</button>
            ) : (
                <button onClick={() => addToCart(product)}>+</button>
            )}
        </div>
    </div>
}

export default CartProductCard;