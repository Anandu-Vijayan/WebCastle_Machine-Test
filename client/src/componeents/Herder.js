"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  const handleLogout = () => {
    try {
      localStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return null; // Or return a loading spinner or message
  }

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              Your Logo
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/admin/login">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
