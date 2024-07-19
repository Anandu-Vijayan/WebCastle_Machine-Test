"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState('');

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

    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Set the initial path
    setCurrentPath(window.location.pathname);

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
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
            <Link href="/" className="ml-4">
              E-commerce
            </Link>
          </div>
          <div className="flex items-center">
            {currentPath !== '/productlist' && (
              <Link href="/productlist" className="mr-4"> 
                Product List
              </Link>
            )}
            {currentPath === '/productlist' && (
              <Link href="/createproduct" className="mr-4"> 
                Create Product
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-4"
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
