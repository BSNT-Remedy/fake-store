import CartProductCard from "../components/CartProductCard";
import { useCart } from "../contexts/CartContext";

function Checkout() {
    const {checkoutItems} = useCart();

    return <div className="checkout">
        {checkoutItems.map(item => (
            <CartProductCard product={item} key={item.id}/>
        ))}
    </div>
}

export default Checkout;