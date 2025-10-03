import { createContext, useContext, useState, useEffect } from "react";
import { getProducts, searchProducts } from "../services/api";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

      async function fetchProducts() {
        setLoading(true);
    
        try{
          if(!mounted){
            const data = await getProducts();
            setAllProducts(data);
            setProducts(data.slice(0, 30));
            setMounted(true);
          } else {
            const data = allProducts.filter(p => 
              p.title.toLowerCase().includes(query)
            );
            setProducts(data);
          }
        } catch(error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, [])
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          if(!query.trim() && mounted){
            setProducts(allProducts);
            return;
          }

          fetchProducts();
        }, 500);

        return () => clearTimeout(timeout);
      }, [query]);

      const value = {
        products, setProducts,
        query, setQuery,
        loading, setLoading,
        // debouncedQuery
      }

      return <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
}