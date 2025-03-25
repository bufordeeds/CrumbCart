import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";
import { usePage } from "@inertiajs/react";

export default function BreadIndex({ breadTypes, weeklyInventory }) {
    const { auth } = usePage().props;

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    This Week's Bread
                </h2>
            }
        >
            <Head title="Bread Catalog" />

            <div className="py-8">
                <Container>
                    {/* Intro section */}
                    <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-amber-800 md:text-3xl">
                            Artisan Sourdough Selection
                        </h1>
                        <p className="mb-4 text-gray-600">
                            Each loaf is handcrafted with care using traditional
                            methods and the finest ingredients. Place your order
                            by Wednesday for weekend pickup.
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

    return (
        <Card className="h-full">
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
                        ${item.price ? item.price.toFixed(2) : "0.00"}
                    </div>
                    <div className="text-sm text-gray-500">
                        {isAvailable
                            ? `${item.available_count} available`
                            : "Sold out"}
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
                    href={isAvailable ? "#" : "#"}
                    onClick={() =>
                        isAvailable &&
                        alert(
                            "Order functionality will be implemented in the next phase"
                        )
                    }
                >
                    Order Now
                </Button>
            </Card.Footer>
        </Card>
    );
}
