import { forwardRef } from "react";

const Badge = forwardRef(
    (
        {
            children,
            variant = "default",
            size = "md",
            rounded = "full",
            className = "",
            ...props
        },
        ref
    ) => {
        // Base classes
        const baseClasses =
            "inline-flex items-center justify-center font-medium";

        // Size variations
        const sizeClasses = {
            sm: "px-2 py-0.5 text-xs",
            md: "px-2.5 py-0.5 text-sm",
            lg: "px-3 py-1 text-base",
        };

        // Variant styles
        const variantClasses = {
            default: "bg-gray-100 text-gray-800",
            primary: "bg-amber-100 text-amber-800",
            secondary: "bg-gray-100 text-gray-800",
            success: "bg-green-100 text-green-800",
            danger: "bg-red-100 text-red-800",
            warning: "bg-yellow-100 text-yellow-800",
            info: "bg-blue-100 text-blue-800",
            outline: "bg-transparent border border-current text-gray-500",
        };

        // Rounded variations
        const roundedClasses = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        };

        // Combine all classes
        const classes = [
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            roundedClasses[rounded],
            className,
        ].join(" ");

        return (
            <span ref={ref} className={classes} {...props}>
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export default Badge;
