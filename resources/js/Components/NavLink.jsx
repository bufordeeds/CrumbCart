import { Link } from "@inertiajs/react";

export default function NavLink({
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
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? isAdminRoute
                        ? "border-amber-300 focus:border-amber-400" // Admin active state
                        : "border-indigo-400 text-gray-900 focus:border-indigo-700" // Default active state
                    : isAdminRoute
                    ? "border-transparent text-amber-200 hover:border-amber-100 hover:text-amber-50 focus:border-amber-100 focus:text-amber-50" // Admin inactive state
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700") + // Default inactive state
                className
            }
        >
            {children}
        </Link>
    );
}
