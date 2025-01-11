import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-6xl font-extrabold text-indigo-600">404</h2>
        <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Go back home
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}