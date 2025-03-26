import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function OrdersIndex({ orders, filters }) {
    // Format date
    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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

    // Handle status filter change
    const handleStatusChange = (e) => {
        router.get(
            route("admin.orders.index"),
            { status: e.target.value },
            { preserveState: true }
        );
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-8">
                <Container>
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manage Orders
                        </h1>
                        <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                            <div>
                                <label
                                    htmlFor="status-filter"
                                    className="mr-2 text-sm font-medium text-gray-700"
                                >
                                    Status:
                                </label>
                                <select
                                    id="status-filter"
                                    value={filters.status || ""}
                                    onChange={handleStatusChange}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="">All</option>
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <Button
                                href={route("admin.orders.create")}
                                variant="primary"
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
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                New Order
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <Card.Content>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Order ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Customer
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Bread
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Dates
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {orders.data.length > 0 ? (
                                            orders.data.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        #{order.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-sm text-gray-900">
                                                            {order.user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {order.user.email}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                order
                                                                    .weekly_inventory
                                                                    .bread_type
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Qty:{" "}
                                                            {order.quantity} | $
                                                            {Number(
                                                                order.total_price
                                                            ).toFixed(2)}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        <div className="flex flex-col">
                                                            <span>
                                                                Order:{" "}
                                                                {formatDate(
                                                                    order.created_at
                                                                )}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                Pickup:{" "}
                                                                {formatDate(
                                                                    order.pickup_date
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {getStatusBadge(
                                                            order.status
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "admin.orders.show",
                                                                    order.id
                                                                )}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "admin.orders.edit",
                                                                    order.id
                                                                )}
                                                                className="text-amber-600 hover:text-amber-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            {order.status ===
                                                                "cancelled" && (
                                                                <Link
                                                                    href={route(
                                                                        "admin.orders.destroy",
                                                                        order.id
                                                                    )}
                                                                    method="delete"
                                                                    as="button"
                                                                    className="text-red-600 hover:text-red-900"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            !confirm(
                                                                                "Are you sure you want to delete this order? This action cannot be undone."
                                                                            )
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                                >
                                                    No orders found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Content>
                        {orders.links && (
                            <Card.Footer>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing {orders.from} to {orders.to} of{" "}
                                        {orders.total} orders
                                    </div>
                                    <div className="flex space-x-2">
                                        {orders.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`rounded px-4 py-2 text-sm ${
                                                    link.active
                                                        ? "bg-blue-500 text-white"
                                                        : link.url
                                                        ? "bg-white text-blue-500 hover:bg-blue-100"
                                                        : "bg-gray-100 text-gray-400"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Card.Footer>
                        )}
                    </Card>
                </Container>
            </div>
        </AdminLayout>
    );
}
