import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function BreadIndex({ breadTypes, weeklyInventory }) {
    const { auth } = usePage().props;
    const [nextBakeDate, setNextBakeDate] = useState(null);
    const [orderDeadline, setOrderDeadline] = useState(null);
    const [daysUntilDeadline, setDaysUntilDeadline] = useState(null);
    const [currentStage, setCurrentStage] = useState("ordering"); // ordering, baking, pickup

    // Format date for display
    const formatDate = (dateString) => {
        const options = { weekday: "long", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate days until deadline
    useEffect(() => {
        if (weeklyInventory && weeklyInventory.length > 0) {
            // Find the earliest bake date and its corresponding deadline
            let earliestBakeDate = new Date(weeklyInventory[0].bake_date);
            let earliestDeadline = new Date(weeklyInventory[0].order_deadline);

            weeklyInventory.forEach((item) => {
                const bakeDate = new Date(item.bake_date);
                const deadline = new Date(item.order_deadline);

                if (bakeDate < earliestBakeDate) {
                    earliestBakeDate = bakeDate;
                    earliestDeadline = deadline;
                }
            });

            setNextBakeDate(earliestBakeDate);
            setOrderDeadline(earliestDeadline);

            // Calculate days until deadline
            const today = new Date();
            const timeDiff = earliestDeadline.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setDaysUntilDeadline(daysDiff);

            // Determine current stage
            if (today > earliestBakeDate) {
                setCurrentStage("pickup");
            } else if (today > earliestDeadline) {
                setCurrentStage("baking");
            } else {
                setCurrentStage("ordering");
            }
        }
    }, [weeklyInventory]);

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Fresh Sourdough -{" "}
                    {nextBakeDate
                        ? `Baked ${formatDate(nextBakeDate)}`
                        : "This Week's Batch"}
                </h2>
            }
        >
            <Head title="Fresh Weekly Sourdough" />

            <div className="py-8">
                <Container>
                    {/* Weekly Baking Schedule */}
                    <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <h2 className="mb-3 text-lg font-semibold text-amber-800">
                            This Week's Baking Schedule
                        </h2>

                        <div className="relative mb-4">
                            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 transform bg-amber-200"></div>

                            {/* Timeline points */}
                            <div className="relative flex justify-between">
                                {/* Ordering Stage */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                            currentStage === "ordering"
                                                ? "border-amber-600 bg-amber-500 text-white"
                                                : "border-amber-400 bg-white text-amber-800"
                                        }`}
                                    >
                                        1
                                    </div>
                                    <p className="mt-2 text-center text-sm font-medium">
                                        Order
                                    </p>
                                    <p className="text-center text-xs text-gray-500">
                                        {orderDeadline
                                            ? `By ${formatDate(orderDeadline)}`
                                            : "By Wednesday"}
                                    </p>
                                    {daysUntilDeadline > 0 &&
                                        currentStage === "ordering" && (
                                            <span className="mt-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                {daysUntilDeadline}{" "}
                                                {daysUntilDeadline === 1
                                                    ? "day"
                                                    : "days"}{" "}
                                                left
                                            </span>
                                        )}
                                </div>

                                {/* Baking Stage */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                            currentStage === "baking"
                                                ? "border-amber-600 bg-amber-500 text-white"
                                                : "border-amber-400 bg-white text-amber-800"
                                        }`}
                                    >
                                        2
                                    </div>
                                    <p className="mt-2 text-center text-sm font-medium">
                                        Baking
                                    </p>
                                    <p className="text-center text-xs text-gray-500">
                                        {nextBakeDate
                                            ? formatDate(nextBakeDate)
                                            : "Friday"}
                                    </p>
                                </div>

                                {/* Pickup Stage */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                            currentStage === "pickup"
                                                ? "border-amber-600 bg-amber-500 text-white"
                                                : "border-amber-400 bg-white text-amber-800"
                                        }`}
                                    >
                                        3
                                    </div>
                                    <p className="mt-2 text-center text-sm font-medium">
                                        Pickup
                                    </p>
                                    <p className="text-center text-xs text-gray-500">
                                        {nextBakeDate
                                            ? `${formatDate(
                                                  new Date(
                                                      nextBakeDate.getTime() +
                                                          86400000
                                                  )
                                              )}`
                                            : "Weekend"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-amber-800">
                            <span className="font-semibold">
                                Current Status:
                            </span>{" "}
                            {currentStage === "ordering"
                                ? `Taking orders for this week's bake. Order by ${
                                      orderDeadline
                                          ? formatDate(orderDeadline)
                                          : "Wednesday"
                                  }!`
                                : currentStage === "baking"
                                ? `We're baking your bread! Pickup available starting ${
                                      nextBakeDate
                                          ? formatDate(
                                                new Date(
                                                    nextBakeDate.getTime() +
                                                        86400000
                                                )
                                            )
                                          : "Saturday"
                                  }.`
                                : `Fresh bread ready for pickup! Come get your delicious sourdough.`}
                        </p>
                    </div>

                    {/* Intro section */}
                    <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-amber-800 md:text-3xl">
                            Artisan Sourdough Selection
                        </h1>
                        <p className="mb-4 text-gray-600">
                            Each loaf is handcrafted with care using traditional
                            methods and the finest ingredients. Our sourdough is
                            baked fresh every week, using a starter that's been
                            nurtured for years.
                        </p>
                    </div>

                    {/* Bread grid */}
                    <Grid
                        cols={1}
                        gap="lg"
                        className="mb-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {weeklyInventory && weeklyInventory.length > 0 ? (
                            weeklyInventory.map((item) => (
                                <BreadCard
                                    key={item.id}
                                    item={item}
                                    breadType={breadTypes.find(
                                        (bt) => bt.id === item.bread_type_id
                                    )}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center">
                                <p className="text-lg text-gray-500">
                                    No bread available this week. Check back
                                    soon!
                                </p>
                            </div>
                        )}
                    </Grid>

                    {/* Info section */}
                    <Card className="bg-amber-50">
                        <Card.Header>
                            <Card.Title>How It Works</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Browse & Order
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Select from our weekly bread
                                            offerings and place your order by
                                            Wednesday.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            Baking Day
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            We bake your bread fresh on Friday
                                            using traditional sourdough methods.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Pickup</h3>
                                        <p className="text-sm text-gray-600">
                                            Collect your fresh bread on Saturday
                                            morning between 9am and 12pm.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </Container>
            </div>
        </MainLayout>
    );
}

// Bread card component
function BreadCard({ item, breadType }) {
    const isAvailable = item.available_count > 0;
    const isLowStock = isAvailable && item.available_count <= 3;

    // Format date for display
    const formatDate = (dateString) => {
        const options = { weekday: "short", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate days until deadline
    const getDaysUntilDeadline = () => {
        if (!item.order_deadline) return null;

        const today = new Date();
        const deadline = new Date(item.order_deadline);
        const timeDiff = deadline.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return daysDiff > 0 ? daysDiff : null;
    };

    const daysUntilDeadline = getDaysUntilDeadline();

    return (
        <Card className="h-full">
            {/* Freshly Baked Badge */}
            <div className="absolute left-0 top-0 z-10 m-2">
                <Badge variant="primary" className="bg-amber-600">
                    Freshly Baked
                </Badge>
            </div>

            {breadType?.image_url && (
                <Card.Image
                    src={breadType.image_url}
                    alt={breadType.name}
                    className="aspect-[4/3] object-cover"
                />
            )}
            <Card.Header>
                <div className="flex items-center justify-between">
                    <Card.Title>{breadType?.name || "Bread"}</Card.Title>
                    <div>
                        {isAvailable ? (
                            isLowStock ? (
                                <Badge variant="warning">Low Stock</Badge>
                            ) : (
                                <Badge variant="success">Available</Badge>
                            )
                        ) : (
                            <Badge variant="danger">Sold Out</Badge>
                        )}
                    </div>
                </div>
                <Card.Description>
                    {breadType?.description?.substring(0, 100)}
                    {breadType?.description?.length > 100 ? "..." : ""}
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-amber-800">
                        ${item.price ? Number(item.price).toFixed(2) : "0.00"}
                    </div>
                    <div className="text-sm text-gray-500">
                        {isAvailable
                            ? `${item.available_count} available`
                            : "Sold out"}
                    </div>
                </div>

                {/* Baking Schedule Info */}
                <div className="mb-4 rounded-md bg-amber-50 p-3 text-sm">
                    <div className="flex items-center text-amber-800">
                        <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="font-medium">Weekly Schedule</span>
                    </div>
                    <div className="mt-2 space-y-1 text-xs">
                        <p>
                            <span className="font-semibold">Baked on:</span>{" "}
                            {item.bake_date
                                ? formatDate(item.bake_date)
                                : "Friday"}
                        </p>
                        <p>
                            <span className="font-semibold">Order by:</span>{" "}
                            {item.order_deadline
                                ? formatDate(item.order_deadline)
                                : "Wednesday"}
                            {daysUntilDeadline !== null && (
                                <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    {daysUntilDeadline}{" "}
                                    {daysUntilDeadline === 1 ? "day" : "days"}{" "}
                                    left
                                </span>
                            )}
                        </p>
                        <p>
                            <span className="font-semibold">Pickup:</span>{" "}
                            {item.bake_date
                                ? formatDate(
                                      new Date(
                                          new Date(item.bake_date).getTime() +
                                              86400000
                                      )
                                  )
                                : "Weekend"}
                        </p>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer className="flex justify-between">
                <Button
                    href={route("bread.show", breadType?.id)}
                    variant="outline"
                    size="sm"
                >
                    Details
                </Button>
                <Button
                    disabled={!isAvailable}
                    variant="primary"
                    size="sm"
                    href={
                        isAvailable ? route("bread.show", breadType?.id) : "#"
                    }
                >
                    Order Now
                </Button>
            </Card.Footer>
        </Card>
    );
}
