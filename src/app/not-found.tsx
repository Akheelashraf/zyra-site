import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mb-6 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link
        href="/en"
        className="rounded-xl bg-zyra-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-zyra-deep"
      >
        Go to Home
      </Link>
    </div>
  );
}
