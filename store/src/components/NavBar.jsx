import "../css/NavBar.css"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext";

function NavBar() {
    const {cart} = useCart();
    return <div className="nav-container">
        <Link to="/" className="app">E-commerce App</Link>
        <Link to="/cart" className="cart">Cart({cart.length})</Link>
    </div>
}

export default NavBar;