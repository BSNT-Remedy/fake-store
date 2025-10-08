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

    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    // const [price, setPrice] = useState("n/a");

    const categories = [
      "beauty", "fragrances", "furniture", "groceries", "home-decoration",
      "kitchen-accessories", "laptops", "mens-shirts", "mens-shoes",
      "mens-watches", "mobile-accessories", "motorcycle", "skin-care",
      "smartphones", "sports-accessories", "sunglasses", "tablets",
      "tops", "vehicle", "womens-bags", "womens-dresses",
      "womens-jewellery", "womens-shoes", "womens-watches"
    ];    

    const filtered = useMemo(() => {
      let filteredProducts = allProducts;
      
      if(query.trim()){
        filteredProducts = allProducts.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if(category) {
        filteredProducts = filteredProducts.filter(p => (
          p.category === category
        ))
      }

      if(sort === "az") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
      } 
      
      if (sort === "za") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
      }
      
      return filteredProducts;
    }, [query, allProducts, category, sort]);

    useEffect(() => {
      setPage(0);
    }, [query, category, sort])

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
        products, categories,
        query, setQuery,
        loading, setLoading,
        page, setPage,
        maxPage,
        category, setCategory,
        sort, setSort,
        // price, setPrice
      }

      return <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
}