import "./css/App.css"
import { useState, useEffect, useCallback } from "react";
import { useProduct } from "./contexts/ProductContext";
import { useCart } from "./contexts/CartContext";
import ProductCard from "./components/ProductCard";
import Toast from "./components/Toast";
import Pagination from "./components/Pagination";

function App() {
  const {
    products, 
    query, setQuery,
    loading, 
    page, setPage,
    maxPage
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
      {!loading && products.length === 0 && <div>No items found.</div>}
      {loading ? "Loading..." : 
        <>
          {products.map((p) => (
            <ProductCard product={p} addToCart={handleAddToCart} key={p.id}/>
          ))}

          {products.length > 0 && <Pagination page={page} setPage={setPage} maxPage={maxPage}/>}
        </>
      }
    </div>

    {showToast.show && <Toast inCart={showToast.inCart} productName={showToast.productName}/>}
  </div>
}

export default App
