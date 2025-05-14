// src/pages/Products.jsx
import { useEffect, useState } from "react";

  
  

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get token after login

    fetch("http://localhost:5000/api/user/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Add token here
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching products");
        setProducts(data.products);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const addToCart = (productId) => {
    const token = localStorage.getItem("authToken"); // Get token after login

    fetch("http://localhost:5000/api/user/addtoCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Add token here
      }, body: JSON.stringify({
        productId:productId ,
        quantity: 1
    })
    })
      .then(async (res) => {
        const data = await res.json({success:true,message:"product is successfully added to cart"});
        if (!res.ok) throw new Error(data.message || "Error adding product to cart");
      })
      .catch((err) => {
        setError(err.message);
      });
  
    }
  if (error) return <p className="text-red-500">{error}</p>;
  if (!products.length) return <p>Loading or no products...</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800 p-4 rounded">
            <h2 className="font-semibold">{product.title}</h2>
            <p>${product.price}</p>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-32 object-cover mt-2 rounded"
            />
        <button onClick={()=> addToCart(product._id)} className="mt-2 bg-gray-600 p-1.5  drop-shadow-amber-300 rounded-md hover:bg-amber-600">addToCart</button>
          </div> 
        ))}
      </div>
      
        
      
    </div>
  );
}


