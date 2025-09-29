import "./css/App.css"
import { useState, useEffect } from "react";
import { useProduct } from "./contexts/ProductContext";
import Product from "./components/Product";

function App() {
  const {
    products, 
    query, setQuery,
    loading, 
  } = useProduct();
  

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
            <Product product={p} key={p.id}/>
          ))
        )
      }
      {!loading && products.length === 0 && <div>No items found.</div>}
    </div>
  </div>
}

export default App
