import { forwardRef } from "react";

const Grid = forwardRef(
    (
        {
            children,
            className = "",
            cols = 1,
            gap = "md",
            as: Component = "div",
            ...props
        },
        ref
    ) => {
        // Base classes
        const baseClasses = "grid";

        // Columns variations - mobile first approach
        // Default to 1 column on mobile, then use responsive breakpoints
        const colsClasses = {
            1: "grid-cols-1",
            2: "grid-cols-1 sm:grid-cols-2",
            3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
            6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
            7: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7",
            8: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8",
            9: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9",
            10: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10",
            11: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-11",
            12: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12",
            none: "",
        };

        // Gap variations
        const gapClasses = {
            none: "gap-0",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
            "2xl": "gap-10",
            "3xl": "gap-12",
        };

        // Combine all classes
        const classes = [
            baseClasses,
            typeof cols === "number" ? colsClasses[cols] : cols,
            gapClasses[gap],
            className,
        ].join(" ");

        return (
            <Component ref={ref} className={classes} {...props}>
                {children}
            </Component>
        );
    }
);

// GridItem component for controlling individual grid items
const GridItem = forwardRef(
    (
        {
            children,
            className = "",
            span = 1,
            colStart,
            colEnd,
            rowStart,
            rowEnd,
            as: Component = "div",
            ...props
        },
        ref
    ) => {
        // Span classes with responsive options
        const getSpanClass = (span) => {
            if (!span) return "";

            // If span is an object with responsive breakpoints
            if (typeof span === "object") {
                return Object.entries(span)
                    .map(([breakpoint, value]) => {
                        if (breakpoint === "default")
                            return `col-span-${value}`;
                        return `${breakpoint}:col-span-${value}`;
                    })
                    .join(" ");
            }

            // If span is just a number
            return `col-span-${span}`;
        };

        // Position classes
        const colStartClass = colStart ? `col-start-${colStart}` : "";
        const colEndClass = colEnd ? `col-end-${colEnd}` : "";
        const rowStartClass = rowStart ? `row-start-${rowStart}` : "";
        const rowEndClass = rowEnd ? `row-end-${rowEnd}` : "";

        // Combine all classes
        const classes = [
            getSpanClass(span),
            colStartClass,
            colEndClass,
            rowStartClass,
            rowEndClass,
            className,
        ].join(" ");

        return (
            <Component ref={ref} className={classes} {...props}>
                {children}
            </Component>
        );
    }
);

Grid.displayName = "Grid";
GridItem.displayName = "GridItem";

Grid.Item = GridItem;

export default Grid;
