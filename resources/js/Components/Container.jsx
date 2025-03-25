import { forwardRef } from "react";

const Container = forwardRef(
    (
        {
            children,
            className = "",
            maxWidth = "7xl",
            padding = true,
            centered = true,
            as: Component = "div",
            ...props
        },
        ref
    ) => {
        // Max width variations
        const maxWidthClasses = {
            none: "",
            xs: "max-w-xs",
            sm: "max-w-sm",
            md: "max-w-md",
            lg: "max-w-lg",
            xl: "max-w-xl",
            "2xl": "max-w-2xl",
            "3xl": "max-w-3xl",
            "4xl": "max-w-4xl",
            "5xl": "max-w-5xl",
            "6xl": "max-w-6xl",
            "7xl": "max-w-7xl",
            full: "max-w-full",
            prose: "max-w-prose",
            "screen-sm": "max-w-screen-sm",
            "screen-md": "max-w-screen-md",
            "screen-lg": "max-w-screen-lg",
            "screen-xl": "max-w-screen-xl",
            "screen-2xl": "max-w-screen-2xl",
        };

        // Padding classes
        const paddingClasses = padding ? "px-4 sm:px-6 lg:px-8" : "";

        // Centered class
        const centeredClass = centered ? "mx-auto" : "";

        // Combine all classes
        const classes = [
            maxWidthClasses[maxWidth],
            paddingClasses,
            centeredClass,
            className,
        ].join(" ");

        return (
            <Component ref={ref} className={classes} {...props}>
                {children}
            </Component>
        );
    }
);

Container.displayName = "Container";

export default Container;
