import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    // Check if we're in an admin route
    const isAdminRoute = window.location.pathname.startsWith("/admin");

    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? isAdminRoute
                        ? "border-amber-300 bg-amber-700 focus:border-amber-400 focus:bg-amber-600" // Admin active state
                        : "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800" // Default active state
                    : isAdminRoute
                    ? "border-transparent text-amber-200 hover:border-amber-100 hover:bg-amber-700 hover:text-amber-50 focus:border-amber-100 focus:bg-amber-700 focus:text-amber-50" // Admin inactive state
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800" // Default inactive state
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
