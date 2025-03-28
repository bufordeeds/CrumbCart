import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import BreadLogo from "@/Components/BreadLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Transition } from "@headlessui/react";

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState("");

    // Get the flash messages from usePage
    const { flash } = usePage().props;

    // Check for flash messages
    useEffect(() => {
        if (flash && (flash.success || flash.error)) {
            setNotification(flash.success || flash.error);
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-amber-200 bg-amber-800 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route("admin.dashboard")}>
                                    <BreadLogo className="block h-10 w-auto text-white" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("admin.dashboard")}
                                    active={route().current("admin.dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("admin.bread-types.index")}
                                    active={route().current(
                                        "admin.bread-types.*"
                                    )}
                                >
                                    Bread Types
                                </NavLink>
                                <NavLink
                                    href={route(
                                        "admin.weekly-inventories.index"
                                    )}
                                    active={route().current(
                                        "admin.weekly-inventories.*"
                                    )}
                                >
                                    Inventory
                                </NavLink>
                                <NavLink
                                    href={route("admin.orders.index")}
                                    active={route().current("admin.orders.*")}
                                >
                                    Orders
                                </NavLink>
                                <NavLink href={route("dashboard")}>
                                    Customer View
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="relative ml-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-amber-700 px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-amber-600 focus:outline-none"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="-mr-0.5 ml-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.index")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-amber-200 transition duration-150 ease-in-out hover:bg-amber-700 hover:text-white focus:bg-amber-700 focus:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("admin.dashboard")}
                            active={route().current("admin.dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("admin.bread-types.index")}
                            active={route().current("admin.bread-types.*")}
                        >
                            Bread Types
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("admin.weekly-inventories.index")}
                            active={route().current(
                                "admin.weekly-inventories.*"
                            )}
                        >
                            Inventory
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("admin.orders.index")}
                            active={route().current("admin.orders.*")}
                        >
                            Orders
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route("dashboard")}>
                            Customer View
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-amber-700 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {auth.user.name}
                            </div>
                            <div className="text-sm font-medium text-amber-200">
                                {auth.user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.index")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                {/* Toast Notification */}
                <Transition
                    show={showNotification}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className="fixed right-4 top-4 z-50 rounded-md bg-white p-4 shadow-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {flash && flash.success ? (
                                    <svg
                                        className="h-6 w-6 text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6 text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                    {notification}
                                </p>
                            </div>
                            <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                    <button
                                        onClick={() =>
                                            setShowNotification(false)
                                        }
                                        className="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                {children}
            </main>

            <footer className="bg-gray-800 py-4 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 md:mb-0">
                            <BreadLogo className="h-8 w-8 text-white" />
                            <p className="mt-2 text-sm">
                                CrumbCart - Admin Panel
                            </p>
                        </div>
                        <div className="text-center text-xs text-gray-400">
                            &copy; {new Date().getFullYear()} CrumbCart. All
                            rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
