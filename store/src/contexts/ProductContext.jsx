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
    const [maxPage, setMaxPage] = useState(0);

    const filtered = useMemo(() => {
      setPage(0);
      if(!query.trim()) return allProducts;
      if(query.trim()){
        return allProducts.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase())
        );
      }
    }, [query, allProducts]);

    const productsPerPage = 30;

    const products = useMemo(() => {
      const start = page * productsPerPage;
      const end = Math.min(start + productsPerPage, filtered.length);

      console.log("Query: ", filtered.length);
      console.log("Start: ", start, " End : ", end);
      console.log("Max Page : ", maxPage);

      return filtered.slice(start, end);
    }, [page, filtered, query]);

    useEffect(() => {
      setMaxPage(Math.ceil(filtered.length / productsPerPage) - 1);
    }, [page, filtered, query]);

      async function fetchProducts() {
        setLoading(true);
    
        try{
          if(!mounted){
            const data = await getProducts();
            setAllProducts(data);
            setMounted(true);
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

      useLayoutEffect(() => {
        scrollToTop();
      }, [page]);

      const value = {
        products,
        query, setQuery,
        loading, setLoading,
        page, setPage,
        maxPage
      }

      return <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
}