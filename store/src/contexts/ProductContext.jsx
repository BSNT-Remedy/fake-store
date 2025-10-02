import { createContext, useContext, useState, useEffect } from "react";
import { getProducts, searchProducts } from "../services/api";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchProducts() {
        setLoading(true);
    
        try{
          if(!query.trim()){
            const data = await getProducts();
            setProducts(data);
            setAllProducts(data);
          } else {
            const data = await searchProducts(debouncedQuery);
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
          setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timeout);
      }, [query]);

      useEffect(() => {
        fetchProducts();
      }, [debouncedQuery]);

      const value = {
        products, setProducts,
        query, setQuery,
        loading, setLoading,
        debouncedQuery
      }

      return <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
}