import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function WeeklyInventoriesShow({ weeklyInventory }) {
    // Format date
    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View Inventory
                </h2>
            }
        >
            <Head title={`Inventory - ${weeklyInventory.bread_type.name}`} />

            <div className="py-8">
                <Container>
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {weeklyInventory.bread_type.name} - Week{" "}
                            {weeklyInventory.week_number},{" "}
                            {weeklyInventory.year}
                        </h1>
                        <div className="flex space-x-2">
                            <Button
                                href={route(
                                    "admin.weekly-inventories.edit",
                                    weeklyInventory.id
                                )}
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
                                href={route("admin.weekly-inventories.index")}
                                variant="primary"
                            >
                                Back to List
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Inventory Details */}
                        <div className="md:col-span-2">
                            <Card>
                                <Card.Header>
                                    <Card.Title>Inventory Details</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Bread Type
                                            </h3>
                                            <div className="mt-2 flex items-center">
                                                {weeklyInventory.bread_type
                                                    .image_path ? (
                                                    <img
                                                        src={
                                                            weeklyInventory
                                                                .bread_type
                                                                .image_path
                                                        }
                                                        alt={
                                                            weeklyInventory
                                                                .bread_type.name
                                                        }
                                                        className="mr-3 h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="mr-3 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                                        <span className="text-amber-800">
                                                            {weeklyInventory.bread_type.name.charAt(
                                                                0
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="text-lg font-medium text-gray-900">
                                                    {
                                                        weeklyInventory
                                                            .bread_type.name
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Status
                                            </h3>
                                            <div className="mt-2">
                                                {weeklyInventory.is_active ? (
                                                    <Badge variant="success">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="danger">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Week
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                Week{" "}
                                                {weeklyInventory.week_number},{" "}
                                                {weeklyInventory.year}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Available Quantity
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                {
                                                    weeklyInventory.available_quantity
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Bake Date
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                {formatDate(
                                                    weeklyInventory.bake_date
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Order Deadline
                                            </h3>
                                            <p className="mt-2 text-lg text-gray-900">
                                                {formatDate(
                                                    weeklyInventory.order_deadline
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>

                        {/* Bread Type Details */}
                        <div>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Bread Information</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Description
                                            </h3>
                                            <p className="mt-2 text-gray-900">
                                                {
                                                    weeklyInventory.bread_type
                                                        .description
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Price
                                            </h3>
                                            <p className="mt-2 text-lg font-medium text-gray-900">
                                                $
                                                {weeklyInventory.bread_type.price.toFixed(
                                                    2
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Ingredients
                                            </h3>
                                            <p className="mt-2 text-gray-900">
                                                {
                                                    weeklyInventory.bread_type
                                                        .ingredients
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="mt-6">
                        <Card>
                            <Card.Header>
                                <Card.Title>Orders</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                {weeklyInventory.orders &&
                                weeklyInventory.orders.length > 0 ? (
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
                                                        Quantity
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                    >
                                                        Order Date
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
                                                {weeklyInventory.orders.map(
                                                    (order) => (
                                                        <tr key={order.id}>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                                #{order.id}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                                {
                                                                    order.user
                                                                        .name
                                                                }
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                                {order.quantity}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                {formatDate(
                                                                    order.created_at
                                                                )}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                                <Badge
                                                                    variant={
                                                                        order.status ===
                                                                        "completed"
                                                                            ? "success"
                                                                            : order.status ===
                                                                              "cancelled"
                                                                            ? "danger"
                                                                            : "warning"
                                                                    }
                                                                >
                                                                    {order.status
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        order.status.slice(
                                                                            1
                                                                        )}
                                                                </Badge>
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
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="py-4 text-center text-gray-500">
                                        No orders found for this inventory
                                    </div>
                                )}
                            </Card.Content>
                        </Card>
                    </div>
                </Container>
            </div>
        </AdminLayout>
    );
}
