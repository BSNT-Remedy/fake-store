import { createContext, useContext, useState, useEffect,useLayoutEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, searchProducts } from "../services/api";
import { scrollToTop } from "../utilities/scrollToTop";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "default";
  const pageNum = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("query") || "";
  const productCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(searchQuery);
  const [page, setPage] = useState(pageNum);
  const [maxPage, setMaxPage] = useState(0);

  const [category, setCategory] = useState(productCategory);
  const [sortFilter, setSortFilter] = useState(sort);

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

    if(sortFilter === "az") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
    } 
    
    if (sortFilter === "za") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
    }

    if(sortFilter === "asc") {
      filteredProducts = [...filteredProducts].sort((a, b) => 
        a.price - b.price);
    }
    if(sortFilter === "des") {
      filteredProducts = [...filteredProducts].sort((a, b) => 
        b.price - a.price);
    }
    
    return filteredProducts;
  }, [query, allProducts, category, sortFilter]);

  useEffect(() => {
    if(mounted){
      setPage(1);
    }
  }, [query, category, sortFilter])

  useEffect(() => {
    const params = {};

    if(query.trim()) params.query = query;
    if(category) params.category = category;
    params.sort = sortFilter;
    params.page = page;

    setSearchParams(params);
  }, [sortFilter, page, query, category]);

  const productsPerPage = 30;

  const products = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    const end = Math.min(start + productsPerPage, filtered.length);

    console.log("Query: ", filtered.length);
    console.log("Start: ", start, " End : ", end);
    console.log("Max Page : ", maxPage);

    return filtered.slice(start, end);
  }, [page, filtered, query]);

  useEffect(() => {
    setMaxPage(Math.ceil(filtered.length / productsPerPage));
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
    sortFilter, setSortFilter,
  }

  return <ProductContext.Provider value={value}>
    {children}
  </ProductContext.Provider>
}