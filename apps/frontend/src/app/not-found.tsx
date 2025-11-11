import Link from 'next/link';

export default function RootNotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <Link
          href="/en"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
