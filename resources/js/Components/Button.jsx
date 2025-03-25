import { Link } from "@inertiajs/react";
import { forwardRef } from "react";

const Button = forwardRef(
    (
        {
            type = "submit",
            className = "",
            disabled = false,
            children,
            href = null,
            method = "get",
            as = "button",
            variant = "primary",
            size = "md",
            fullWidth = false,
            ...props
        },
        ref
    ) => {
        // Base classes for all buttons
        const baseClasses =
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

        // Size variations
        const sizeClasses = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-5 py-2.5 text-lg",
            xl: "px-6 py-3 text-xl",
        };

        // Variant styles
        const variantClasses = {
            primary:
                "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500",
            secondary:
                "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
            outline:
                "bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
            danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
            success:
                "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
            ghost: "bg-transparent text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
        };

        // Combine all classes
        const classes = [
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            fullWidth ? "w-full" : "",
            className,
        ].join(" ");

        // If href is provided, render as Link
        if (href) {
            return (
                <Link
                    href={href}
                    method={method}
                    as={as}
                    className={classes}
                    {...props}
                    ref={ref}
                >
                    {children}
                </Link>
            );
        }

        // Otherwise render as button
        return (
            <button
                type={type}
                className={classes}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
