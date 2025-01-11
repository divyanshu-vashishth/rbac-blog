export default function Home() {
  return (
    <div className="space-y-8"> 
        <h1 className="text-3xl font-bold">RBAC Blog</h1>
        <p className="text-lg text-gray-600">
          Check out the latest blog posts on our website.
        </p>
        <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Read More
        </button>
    </div>
    );
  }