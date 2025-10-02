import "./css/App.css"
import { useState, useEffect, useCallback } from "react";
import { useProduct } from "./contexts/ProductContext";
import { useCart } from "./contexts/CartContext";
import ProductCard from "./components/ProductCard";
import Toast from "./components/Toast";

function App() {
  const {
    products, 
    query, setQuery,
    loading, 
  } = useProduct();
  
  const {showToast, addToCart} = useCart();

  const handleAddToCart = useCallback(
    (product) => addToCart(product),
    [addToCart]
  );

  return <div className="main-content">
    <div className="search-bar">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)} 
          placeholder="search an item..."
        />
    </div>
    <div className="products">
      {loading ? "Loading..." : 
        (
          products.map((p) => (
            <ProductCard product={p} addToCart={handleAddToCart} key={p.id}/>
          ))
        )
      }
      {!loading && products.length === 0 && <div>No items found.</div>}
    </div>

    {showToast.show && <Toast inCart={showToast.inCart} productName={showToast.productName}/>}
  </div>
}

export default App
