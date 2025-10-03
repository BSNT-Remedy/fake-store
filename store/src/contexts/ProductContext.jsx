import { createContext, useContext, useState, useEffect,useLayoutEffect, useMemo } from "react";
import { getProducts, searchProducts } from "../services/api";
import { scrollToTop } from "../utilities/scrollToTop";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [allProducts, setAllProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    const products = useMemo(() => {
      const start = page * 30;
      const end = Math.min(start + 30, 194);
      console.log("End: ", end);
      return allProducts.slice(start, end);
    }, [page, allProducts])

      async function fetchProducts() {
        setLoading(true);
    
        try{
          if(!mounted){
            const data = await getProducts();
            setAllProducts(data);
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
          fetchProducts();
        }, 500);

        return () => clearTimeout(timeout);
      }, [query]);

      useLayoutEffect(() => {
        scrollToTop();
      }, [page]);

      const value = {
        products,
        query, setQuery,
        loading, setLoading,
        page, setPage,
      }

      return <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
}