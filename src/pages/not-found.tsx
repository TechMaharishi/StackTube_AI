import { Link } from "react-router-dom";
import { Strong } from "@/components/ui/text";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <Strong className="text-6xl font-extrabold text-indigo-500">404</Strong>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}