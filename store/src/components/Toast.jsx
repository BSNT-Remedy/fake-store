import "../css/Toast.css";
import { useState } from "react";

function Toast({inCart}) {
    // const [message, setMessage] = useState();

    return <div className="toast-container">
        <p>{inCart ? "Product already in cart" : "Product added to cart!"}</p>
    </div>
}

export default Toast;