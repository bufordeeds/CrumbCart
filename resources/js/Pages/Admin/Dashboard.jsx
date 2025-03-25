import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Container from "@/Components/Container";
import Badge from "@/Components/Badge";
import Button from "@/Components/Button";

export default function AdminDashboard({ stats, recentOrders, lowInventory }) {
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

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <Container>
                    {/* Stats Section */}
                    <div className="mb-8">
                        <Grid cols={2} gap="md" className="sm:grid-cols-4">
                            <StatCard
                                title="Total Users"
                                value={stats.totalUsers}
                                icon={
                                    <svg
                                        className="h-6 w-6 text-blue-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                }
                                href={route("admin.orders.index")}
                            />
                            <StatCard
                                title="Bread Types"
                                value={stats.totalBreadTypes}
                                icon={
                                    <svg
                                        className="h-6 w-6 text-amber-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                }
                                href={route("admin.bread-types.index")}
                            />
                            <StatCard
                                title="Active Inventory"
                                value={stats.activeInventory}
                                icon={
                                    <svg
                                        className="h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                        />
                                    </svg>
                                }
                                href={route("admin.weekly-inventories.index")}
                            />
                            <StatCard
                                title="Pending Orders"
                                value={stats.pendingOrders}
                                icon={
                                    <svg
                                        className="h-6 w-6 text-red-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                }
                                href={
                                    route("admin.orders.index") +
                                    "?status=pending"
                                }
                            />
                        </Grid>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Recent Orders Section */}
                        <div className="lg:col-span-2">
                            <Card>
                                <Card.Header>
                                    <div className="flex items-center justify-between">
                                        <Card.Title>Recent Orders</Card.Title>
                                        <Link
                                            href={route("admin.orders.index")}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </Card.Header>
                                <Card.Content>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                    >
                                                        Order
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
                                                        Status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                    >
                                                        Date
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
                                                {recentOrders.length > 0 ? (
                                                    recentOrders.map(
                                                        (order) => (
                                                            <tr key={order.id}>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        #
                                                                        {
                                                                            order.id
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <div className="text-sm text-gray-900">
                                                                        {
                                                                            order
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {
                                                                            order
                                                                                .user
                                                                                .email
                                                                        }
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
                                                                        {
                                                                            order.quantity
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {getStatusBadge(
                                                                        order.status
                                                                    )}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                    {formatDate(
                                                                        order.created_at
                                                                    )}
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                                    <Link
                                                                        href={route(
                                                                            "admin.orders.show",
                                                                            order.id
                                                                        )}
                                                                        className="text-blue-600 hover:text-blue-900"
                                                                    >
                                                                        View
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="6"
                                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                                        >
                                                            No recent orders
                                                            found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card.Content>
                                <Card.Footer>
                                    <Button
                                        href={route("admin.orders.create")}
                                        variant="primary"
                                        size="sm"
                                    >
                                        Create New Order
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </div>

                        {/* Low Inventory Alert Section */}
                        <div>
                            <Card>
                                <Card.Header>
                                    <div className="flex items-center justify-between">
                                        <Card.Title>
                                            Low Inventory Alert
                                        </Card.Title>
                                        <Link
                                            href={route(
                                                "admin.weekly-inventories.index"
                                            )}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        {lowInventory.length > 0 ? (
                                            lowInventory.map((inventory) => (
                                                <div
                                                    key={inventory.id}
                                                    className="rounded-lg border border-red-100 bg-red-50 p-4"
                                                >
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            <svg
                                                                className="h-5 w-5 text-red-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h3 className="text-sm font-medium text-red-800">
                                                                {
                                                                    inventory
                                                                        .bread_type
                                                                        .name
                                                                }
                                                            </h3>
                                                            <div className="mt-2 text-sm text-red-700">
                                                                <p>
                                                                    Only{" "}
                                                                    <span className="font-bold">
                                                                        {
                                                                            inventory.available_quantity
                                                                        }
                                                                    </span>{" "}
                                                                    loaves
                                                                    remaining
                                                                    for Week{" "}
                                                                    {
                                                                        inventory.week_number
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="mt-3">
                                                                <Link
                                                                    href={route(
                                                                        "admin.weekly-inventories.edit",
                                                                        inventory.id
                                                                    )}
                                                                    className="text-sm font-medium text-red-800 hover:text-red-600"
                                                                >
                                                                    Update
                                                                    Inventory
                                                                    &rarr;
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            className="h-5 w-5 text-green-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-green-800">
                                                            All Good!
                                                        </h3>
                                                        <div className="mt-2 text-sm text-green-700">
                                                            <p>
                                                                All inventory
                                                                items have
                                                                sufficient
                                                                stock.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card.Content>
                                <Card.Footer>
                                    <Button
                                        href={route(
                                            "admin.weekly-inventories.create"
                                        )}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Add New Inventory
                                    </Button>
                                </Card.Footer>
                            </Card>

                            {/* Quick Actions Card */}
                            <Card className="mt-6">
                                <Card.Header>
                                    <Card.Title>Quick Actions</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-2">
                                        <Button
                                            href={route(
                                                "admin.bread-types.create"
                                            )}
                                            variant="outline"
                                            className="w-full justify-start"
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
                                            Add New Bread Type
                                        </Button>
                                        <Button
                                            href={route(
                                                "admin.weekly-inventories.create"
                                            )}
                                            variant="outline"
                                            className="w-full justify-start"
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
                                            Add New Inventory
                                        </Button>
                                        <Button
                                            href={route("admin.orders.create")}
                                            variant="outline"
                                            className="w-full justify-start"
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
                                            Create New Order
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        </AdminLayout>
    );
}

// Stat Card Component
function StatCard({ title, value, icon, href }) {
    return (
        <Link href={href}>
            <Card className="transition-all hover:shadow-md">
                <Card.Content className="flex items-center p-6">
                    <div className="mr-4 rounded-full bg-gray-100 p-3">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {value}
                        </h3>
                        <p className="text-sm text-gray-500">{title}</p>
                    </div>
                </Card.Content>
            </Card>
        </Link>
    );
}
