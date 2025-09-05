

export async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
        
    if(!response.ok) {
        console.log("Error fetching products");
        throw new Error("Failed to fetch products")
    }

    const data = await response.json();
    console.log("data: ", data.products);

    return data.products;
}

export async function searchProducts(query) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        
    if(!response.ok) {
        console.log("Error fetching products");
        throw new Error("Failed to fetch products")
    }

    const data = await response.json();
    console.log("data: ", data.products);

    return data.products;
}