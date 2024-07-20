"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
     
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${apiUrl}/getAllProducts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleProductClick = (productId) => {
    router.push(`/singleProduct?id=${productId}`);
  };

  const handleProductClickToUpdate = (event, productId) => {
    event.stopPropagation();
    router.push(`/updateProduct?id=${productId}`);
  };

  const handleProductClickToDelete = async (event, productId) => {
    event.stopPropagation();

    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/deleteProduct/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete product");
      }

      const data = await response.json();

      if (data.success === true) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        router.push("/productlist");
      } else {
        console.error("Failed to delete product:", data);
        setError("Failed to delete product");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-lg cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="relative w-full h-48">
                <img
                  src={`${imageUrl}${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={(event) => handleProductClickToUpdate(event, product._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={(event) => handleProductClickToDelete(event, product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
