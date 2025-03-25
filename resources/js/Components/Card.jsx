import { forwardRef } from "react";

const Card = forwardRef(
    (
        {
            className = "",
            children,
            padding = "normal",
            shadow = "md",
            rounded = "md",
            border = false,
            as: Component = "div",
            ...props
        },
        ref
    ) => {
        // Base classes
        const baseClasses = "bg-white overflow-hidden";

        // Padding variations
        const paddingClasses = {
            none: "",
            sm: "p-2",
            normal: "p-4",
            lg: "p-6",
            xl: "p-8",
        };

        // Shadow variations
        const shadowClasses = {
            none: "",
            sm: "shadow-sm",
            md: "shadow",
            lg: "shadow-lg",
            xl: "shadow-xl",
        };

        // Rounded variations
        const roundedClasses = {
            none: "",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        };

        // Border class
        const borderClass = border ? "border border-gray-200" : "";

        // Combine all classes
        const classes = [
            baseClasses,
            paddingClasses[padding],
            shadowClasses[shadow],
            roundedClasses[rounded],
            borderClass,
            className,
        ].join(" ");

        return (
            <Component ref={ref} className={classes} {...props}>
                {children}
            </Component>
        );
    }
);

// Card subcomponents
const CardHeader = ({ className = "", children, ...props }) => (
    <div
        className={`border-b border-gray-200 pb-3 mb-4 ${className}`}
        {...props}
    >
        {children}
    </div>
);

const CardTitle = ({
    className = "",
    children,
    as: Component = "h3",
    ...props
}) => (
    <Component
        className={`text-lg font-medium text-gray-900 ${className}`}
        {...props}
    >
        {children}
    </Component>
);

const CardDescription = ({ className = "", children, ...props }) => (
    <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
        {children}
    </p>
);

const CardContent = ({ className = "", children, ...props }) => (
    <div className={className} {...props}>
        {children}
    </div>
);

const CardFooter = ({ className = "", children, ...props }) => (
    <div
        className={`border-t border-gray-200 pt-4 mt-4 ${className}`}
        {...props}
    >
        {children}
    </div>
);

const CardImage = ({ src, alt = "", className = "", ...props }) => (
    <div className="w-full overflow-hidden">
        <img
            src={src}
            alt={alt}
            className={`w-full h-auto object-cover ${className}`}
            {...props}
        />
    </div>
);

Card.displayName = "Card";
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
