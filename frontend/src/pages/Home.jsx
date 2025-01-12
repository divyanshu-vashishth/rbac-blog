import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';


export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-8"> 
        <h1 className="text-3xl font-serif">RBAC Blog</h1>
        <p className="text-lg text-gray-600">
          Check out the latest blog posts on our website.
        </p>
        <Button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Read More
        </Button>
        {/* {user} */}
        {user.length > 0 ? (
        <p>Hello, {user[0].name}!</p>
      ) : (
        <p>Please log in to see your personalized content.</p>
      )}
    </div>
    );
  }