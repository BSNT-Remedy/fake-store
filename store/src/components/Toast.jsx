import "../css/Toast.css";
import { useState } from "react";

function Toast({inCart, productName}) {
    // const [message, setMessage] = useState();

    return <div className="toast-container">
        <p>{inCart ? `${productName} already in cart` : `${productName} added to cart!`}</p>
    </div>
}

export default Toast;