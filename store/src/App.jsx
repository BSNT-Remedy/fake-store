import "./css/App.css"
import { useState, useEffect } from "react";
import { getProducts, searchProducts } from "./services/api";
import Product from "./components/Product";


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
  
      try{
        if(!query.trim()){
          const data = await getProducts();
          setProducts(data);
        } else {
          const data = await searchProducts(query);
          setProducts(data);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    const timeout = setTimeout(fetchProducts, 500);
    return () => clearTimeout(timeout);
  }, [query])

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
