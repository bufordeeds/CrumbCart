import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function OrdersShow({ order }) {
    // Format date
    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get status badge variant
    const getStatusVariant = (status) => {
        switch (status) {
            case "completed":
                return "success";
            case "cancelled":
                return "danger";
            case "confirmed":
                return "primary";
            default:
                return "warning";
        }
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View Order
                </h2>
            }
        >
            <Head title={`Order #${order.id}`} />

            <div className="py-8">
                <Container>
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Order #{order.id}
                        </h1>
                        <div className="flex space-x-2">
                            <Button
                                href={route("admin.orders.edit", order.id)}
                                variant="secondary"
                            >
                                <svg
                                    className="-ml-1 mr-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                Edit
                            </Button>
                            <Button
                                href={route("admin.orders.index")}
                                variant="primary"
                            >
                                Back to List
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Order Details */}
                        <div className="md:col-span-2">
                            <Card>
                                <Card.Header>
                                    <Card.Title>Order Details</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Status
                                            </h3>
                                            <div className="mt-2">
                                                <Badge
                                                    variant={getStatusVariant(
                                                        order.status
                                                    )}
                                                >
                                                    {order.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        order.status.slice(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Order Date
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                {formatDate(order.created_at)}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Pickup Date
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                {formatDate(order.pickup_date)}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Quantity
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                {order.quantity} loaves
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Total Price
                                            </h3>
                                            <p className="mt-2 text-lg font-medium text-gray-900">
                                                ${order.total_price.toFixed(2)}
                                            </p>
                                        </div>
                                        {order.notes && (
                                            <div className="md:col-span-2">
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Notes
                                                </h3>
                                                <p className="mt-2 text-gray-900">
                                                    {order.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>

                        {/* Customer Information */}
                        <div>
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Customer Information
                                    </Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Name
                                            </h3>
                                            <p className="mt-2 text-lg font-medium text-gray-900">
                                                {order.user.name}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Email
                                            </h3>
                                            <p className="mt-2 text-gray-900">
                                                {order.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>

                    {/* Bread Information */}
                    <div className="mt-6">
                        <Card>
                            <Card.Header>
                                <Card.Title>Bread Information</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Bread Type
                                        </h3>
                                        <div className="mt-2 flex items-center">
                                            {order.weekly_inventory.bread_type
                                                .image_path ? (
                                                <img
                                                    src={
                                                        order.weekly_inventory
                                                            .bread_type
                                                            .image_path
                                                    }
                                                    alt={
                                                        order.weekly_inventory
                                                            .bread_type.name
                                                    }
                                                    className="mr-3 h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="mr-3 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                                    <span className="text-amber-800">
                                                        {order.weekly_inventory.bread_type.name.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            <span className="text-lg font-medium text-gray-900">
                                                {
                                                    order.weekly_inventory
                                                        .bread_type.name
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Price Per Loaf
                                        </h3>
                                        <p className="mt-2 text-lg text-gray-900">
                                            $
                                            {order.weekly_inventory.bread_type.price.toFixed(
                                                2
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Bake Date
                                        </h3>
                                        <p className="mt-2 text-lg text-gray-900">
                                            {formatDate(
                                                order.weekly_inventory.bake_date
                                            )}
                                        </p>
                                    </div>
                                    <div className="md:col-span-3">
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Description
                                        </h3>
                                        <p className="mt-2 text-gray-900">
                                            {
                                                order.weekly_inventory
                                                    .bread_type.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>

                    {/* Order Timeline */}
                    <div className="mt-6">
                        <Card>
                            <Card.Header>
                                <Card.Title>Order Timeline</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        <li>
                                            <div className="relative pb-8">
                                                <span
                                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                    aria-hidden="true"
                                                ></span>
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                                            <svg
                                                                className="h-5 w-5 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                Order placed
                                                            </p>
                                                        </div>
                                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                            {formatDate(
                                                                order.created_at
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        {order.status !== "pending" && (
                                            <li>
                                                <div className="relative pb-8">
                                                    {order.status !==
                                                        "cancelled" && (
                                                        <span
                                                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                            aria-hidden="true"
                                                        ></span>
                                                    )}
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                                                <svg
                                                                    className="h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.9-.58l1.7-3a1 1 0 00-.9-1.42H11v-1a1 1 0 00-1-1H3z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    Order
                                                                    confirmed
                                                                </p>
                                                            </div>
                                                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                {formatDate(
                                                                    order.updated_at
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}

                                        {order.status === "completed" && (
                                            <li>
                                                <div className="relative pb-8">
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                                                <svg
                                                                    className="h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    Order
                                                                    completed
                                                                </p>
                                                            </div>
                                                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                {formatDate(
                                                                    order.updated_at
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}

                                        {order.status === "cancelled" && (
                                            <li>
                                                <div className="relative pb-8">
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white">
                                                                <svg
                                                                    className="h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    Order
                                                                    cancelled
                                                                </p>
                                                            </div>
                                                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                {formatDate(
                                                                    order.updated_at
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>
                </Container>
            </div>
        </AdminLayout>
    );
}
