import "../css/Checkout.css"
import CartProductCard from "../components/CartProductCard";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const {cart, setCart, checkoutItems, setCheckoutItems} = useCart();
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
            <CartProductCard product={item} key={item.id}/>
        ))}

        <div className="payment-details">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <h3>Tax(10%) : ${tax.toFixed(2)}</h3>
            <h2>Total Price after tax: ${totalPriceWithTax.toFixed(2)}</h2>
            <button onClick={payItems}>Pay</button>
        </div>
    </div>
}

export default Checkout;