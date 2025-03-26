import BreadLogo from "@/Components/BreadLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-amber-50 pt-6 sm:justify-center sm:pt-0">
            <div className="mb-4">
                <Link href="/" className="flex flex-col items-center">
                    <BreadLogo className="h-24 w-24" />
                    <h1 className="mt-2 text-2xl font-bold text-amber-800">
                        CrumbCart
                    </h1>
                </Link>
            </div>

            <div className="mt-2 w-full overflow-hidden bg-white px-8 py-6 shadow-md sm:max-w-md sm:rounded-lg border border-amber-200">
                {children}
            </div>
        </div>
    );
}
