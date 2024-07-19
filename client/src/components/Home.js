"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from 'next/navigation';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('token');
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setLoading(false); // Set loading to false if authenticated
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Or return a loading spinner or message
  }

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-white text-3xl">Welcome Admin</h1>
      </div>
    </div>
  );
};

export default Home;
