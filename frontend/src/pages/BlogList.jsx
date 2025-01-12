import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../services/blogService';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
    <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} to={`/blogs/${post.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                By {post.author.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {post.content.substring(0, 150)}...
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  </div>
  );
}