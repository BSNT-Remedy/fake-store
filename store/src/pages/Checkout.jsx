import "../css/Checkout.css"
import { useState } from "react";
import CartProductCard from "../components/CartProductCard";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

function Checkout() {
    const {cart, setCart, checkoutItems, setCheckoutItems} = useCart();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();

    const totalPrice = checkoutItems.reduce((total, items) => total + items.price, 0);
    const tax = totalPrice/10;
    const totalPriceWithTax = totalPrice + tax;

    function payItems() {
        setCart(prev => prev.filter(cartItem => !checkoutItems.some(checkoutItem => checkoutItem.id === cartItem.id)))
        setCheckoutItems([]);
        navigate("/cart");
    }

    return <div className="checkout">
        {checkoutItems.map(item => (
            <div className="checkout-card" key={item.id}>
                <CartProductCard product={item}/>
            </div>
        ))}

        <div className="payment-details">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <h3>Tax(10%) : ${tax.toFixed(2)}</h3>
            <h2>Total Price after tax: ${totalPriceWithTax.toFixed(2)}</h2>
            
            <button onClick={() => navigate("/cart")}>Cancel</button>
            <button onClick={() => setShowConfirmModal(true)}>Pay</button>
        </div>

        {showConfirmModal && 
            <ConfirmModal 
                onCancel={() => setShowConfirmModal(false)} 
                onConfirm={() => {payItems(), setShowConfirmModal(false)}}
            />
        }
        
    </div>
}

export default Checkout;