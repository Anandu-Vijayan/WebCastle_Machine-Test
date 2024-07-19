"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:4000/users/api/v2/getSingleProduct/${id}`,
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

          if (data) {
            setProduct(data);
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

      fetchProduct();
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
        Error: {error}
      </div>
    );

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        {product ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`http://localhost:4000/${product.images[0]}`}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                Price: ${product.price.toFixed(2)}
              </p>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Category: {product.category}
              </p>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Stock: {product.stock}
              </p>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Ratings: {product.ratings} ★
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">
            Product not found
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProductPage;
