import "./css/App.css"
import { useState, useEffect, useCallback } from "react";
import { useProduct } from "./contexts/ProductContext";
import { useCart } from "./contexts/CartContext";
import ProductCard from "./components/ProductCard";
import Toast from "./components/Toast";
import Pagination from "./components/Pagination";

function App() {
  const {
    products, categories,
    query, setQuery,
    loading, 
    page, setPage,
    maxPage,
    category, setCategory,
    sort, setSort,
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
    
    <div className="filters">
      <div className="category">

          <p>Category :</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      
      <div className="sort">
          <p>Sort :</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="" selected>default</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="asc">Ascending Price</option>
            <option value="des">Descending Price</option>
          </select>
      </div>
       
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
