import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [checkoutItems, setCheckoutItems] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if(saved) {
            const jsonSaved = JSON.parse(saved)
            console.log(jsonSaved);
            setCart(jsonSaved);
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    const addToCart = (product) => {
        if(cart.some(p => p.id === product.id)){
            console.log("product already in cart");
            return;
        }
        
        setCart(prev => [...prev, product]);
        console.log(`${product.title} added to cart`)
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        checkoutItems,
        setCheckoutItems
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}