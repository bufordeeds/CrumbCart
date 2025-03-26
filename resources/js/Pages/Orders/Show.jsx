import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function OrderShow({ order }) {
    const { delete: destroy, processing } = useForm();

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
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Format time
    const formatTime = (dateString) => {
        const options = { hour: "numeric", minute: "2-digit" };
        return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    // Handle order cancellation
    const handleCancelOrder = () => {
        if (confirm("Are you sure you want to cancel this order?")) {
            destroy(route("orders.destroy", order.id));
        }
    };

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order Details
                </h2>
            }
        >
            <Head title={`Order #${order.id}`} />

            <div className="py-8">
                <Container>
                    <div className="mb-4">
                        <Link
                            href={route("orders.index")}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            &larr; Back to Orders
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Order Summary Card */}
                        <div className="md:col-span-2">
                            <Card>
                                <Card.Header>
                                    <div className="flex items-center justify-between">
                                        <Card.Title>
                                            Order #{order.id}
                                        </Card.Title>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <Card.Description>
                                        Placed on {formatDate(order.created_at)}{" "}
                                        at {formatTime(order.created_at)}
                                    </Card.Description>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Bread Type
                                            </h3>
                                            <p className="mt-1 text-lg font-medium">
                                                {
                                                    order.weekly_inventory
                                                        .bread_type.name
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Quantity
                                            </h3>
                                            <p className="mt-1 text-lg font-medium">
                                                {order.quantity}{" "}
                                                {order.quantity > 1
                                                    ? "loaves"
                                                    : "loaf"}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Price
                                            </h3>
                                            <p className="mt-1 text-lg font-medium">
                                                $
                                                {Number(
                                                    order.weekly_inventory
                                                        .bread_type.price
                                                ).toFixed(2)}{" "}
                                                per loaf
                                            </p>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4">
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Total Price
                                            </h3>
                                            <p className="mt-1 text-xl font-bold">
                                                $
                                                {Number(
                                                    order.total_price
                                                ).toFixed(2)}
                                            </p>
                                        </div>

                                        {order.notes && (
                                            <div className="border-t border-gray-200 pt-4">
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Notes
                                                </h3>
                                                <p className="mt-1 text-gray-700 whitespace-pre-line">
                                                    {order.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Card.Content>
                                {order.status === "pending" && (
                                    <Card.Footer>
                                        <Button
                                            onClick={handleCancelOrder}
                                            variant="danger"
                                            disabled={processing}
                                        >
                                            Cancel Order
                                        </Button>
                                    </Card.Footer>
                                )}
                            </Card>
                        </div>

                        {/* Pickup Details Card */}
                        <div>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Pickup Details</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Pickup Date
                                            </h3>
                                            <p className="mt-1 text-lg font-medium">
                                                {formatDate(order.pickup_date)}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Pickup Location
                                            </h3>
                                            <p className="mt-1 text-gray-700">
                                                123 Bakery Street
                                                <br />
                                                Austin, TX 78701
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Pickup Hours
                                            </h3>
                                            <p className="mt-1 text-gray-700">
                                                9:00 AM - 5:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
}
