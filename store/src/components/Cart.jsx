import "../css/Cart.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartProductCard from "./CartProductCard";

function Cart() {
    const {cart, checkoutItems, setCheckoutItems} = useCart();
    const navigate = useNavigate();

    function addToCheckout({product}) {
        if(checkoutItems.some((p) => p.id === product.id)){
            setCheckoutItems(prev => prev.filter(p => p.id !== product.id));
        } else {
            setCheckoutItems(prev => [...prev, product])
        }
    }

    function getTotalPrice() {
        return checkoutItems.reduce((totalPrice, item) => totalPrice + item.price, 0);
    }

    function checkout() {
        if(checkoutItems.length < 1) {
            console.log("walang laman");
            return;
        }
        navigate("/checkout");
    }

    return <div className="cart-container">
        {cart.map((p) => (
            <div className="cart-product-card" key={p.id}>
                <input 
                    type="checkbox"
                    checked={checkoutItems.some((item) => item.id === p.id)}
                    onChange={() => addToCheckout({product: p})}
                />
                <CartProductCard product={p} isCart/>
            </div>
        ))}
        <div className="checkout-container">
            <p>Total Price: ${getTotalPrice()}</p>
            <button onClick={checkout}>Checkout({checkoutItems.length})</button>
        </div>
    </div>
}

export default Cart;