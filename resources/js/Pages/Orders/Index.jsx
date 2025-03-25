import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";
import { usePage } from "@inertiajs/react";

export default function OrdersIndex({ orders }) {
    const { auth } = usePage().props;

    // Group orders by status
    const pendingOrders =
        orders?.filter((order) => order.status === "pending") || [];
    const confirmedOrders =
        orders?.filter((order) => order.status === "confirmed") || [];
    const completedOrders =
        orders?.filter((order) => order.status === "completed") || [];
    const cancelledOrders =
        orders?.filter((order) => order.status === "cancelled") || [];

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Orders
                </h2>
            }
        >
            <Head title="My Orders" />

            <div className="py-8">
                <Container>
                    {/* Active Orders Section */}
                    <div className="mb-8">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">
                            Active Orders
                        </h2>

                        {pendingOrders.length === 0 &&
                        confirmedOrders.length === 0 ? (
                            <Card>
                                <Card.Content className="text-center py-8">
                                    <p className="text-gray-500 mb-4">
                                        You don't have any active orders
                                    </p>
                                    <Button
                                        href={route("bread.index")}
                                        variant="primary"
                                    >
                                        Browse Bread
                                    </Button>
                                </Card.Content>
                            </Card>
                        ) : (
                            <Grid cols={1} gap="md" className="sm:grid-cols-2">
                                {pendingOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                                {confirmedOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </Grid>
                        )}
                    </div>

                    {/* Order History Section */}
                    {(completedOrders.length > 0 ||
                        cancelledOrders.length > 0) && (
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                Order History
                            </h2>
                            <Grid cols={1} gap="md" className="sm:grid-cols-2">
                                {completedOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                                {cancelledOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </Grid>
                        </div>
                    )}
                </Container>
            </div>
        </MainLayout>
    );
}

// Order card component
function OrderCard({ order }) {
    // Status badge styling
    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return <Badge variant="warning">Pending</Badge>;
            case "confirmed":
                return <Badge variant="primary">Confirmed</Badge>;
            case "completed":
                return <Badge variant="success">Completed</Badge>;
            case "cancelled":
                return <Badge variant="danger">Cancelled</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { weekday: "short", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Card>
            <Card.Header>
                <div className="flex items-center justify-between">
                    <Card.Title>Order #{order.id}</Card.Title>
                    {getStatusBadge(order.status)}
                </div>
                <Card.Description>
                    Placed on {formatDate(order.created_at)}
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <div className="space-y-2">
                    {order.items &&
                        order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.bread_type?.name || "Bread"}</span>
                                <span className="font-medium">
                                    ${parseFloat(item.price).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${parseFloat(order.total_price).toFixed(2)}</span>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer className="flex justify-between">
                <Button
                    href={route("orders.show", order.id)}
                    variant="outline"
                    size="sm"
                >
                    View Details
                </Button>
                {order.status === "pending" && (
                    <Button
                        href={route("orders.destroy", order.id)}
                        method="delete"
                        as="button"
                        variant="danger"
                        size="sm"
                    >
                        Cancel Order
                    </Button>
                )}
            </Card.Footer>
        </Card>
    );
}
