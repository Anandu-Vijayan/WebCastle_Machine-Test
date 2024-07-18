"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
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
    return null; // Or return a loading spinner or message
  }

  return (
    <div>
      <Header />
      Home Page
    </div>
  );
};

export default Home;
