import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function WeeklyInventoriesIndex({ weeklyInventories }) {
    // Format date
    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Weekly Inventory
                </h2>
            }
        >
            <Head title="Weekly Inventory" />

            <div className="py-8">
                <Container>
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manage Weekly Inventory
                        </h1>
                        <Button
                            href={route("admin.weekly-inventories.create")}
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
                            Add New Inventory
                        </Button>
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
                                                Bread Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Week
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
                                        {weeklyInventories.data.length > 0 ? (
                                            weeklyInventories.data.map(
                                                (inventory) => (
                                                    <tr key={inventory.id}>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <div className="flex items-center">
                                                                {inventory
                                                                    .bread_type
                                                                    .image_path ? (
                                                                    <img
                                                                        src={
                                                                            inventory
                                                                                .bread_type
                                                                                .image_path
                                                                        }
                                                                        alt={
                                                                            inventory
                                                                                .bread_type
                                                                                .name
                                                                        }
                                                                        className="mr-3 h-10 w-10 rounded-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="mr-3 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                                                        <span className="text-amber-800">
                                                                            {inventory.bread_type.name.charAt(
                                                                                0
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div className="font-medium text-gray-900">
                                                                    {
                                                                        inventory
                                                                            .bread_type
                                                                            .name
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            Week{" "}
                                                            {
                                                                inventory.week_number
                                                            }
                                                            , {inventory.year}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            <div className="flex flex-col">
                                                                <span>
                                                                    Available:{" "}
                                                                    {
                                                                        inventory.available_quantity
                                                                    }
                                                                </span>
                                                                {inventory.available_quantity <
                                                                    5 && (
                                                                    <span className="text-xs text-red-500 font-medium">
                                                                        Low
                                                                        Stock!
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            <div className="flex flex-col">
                                                                <span>
                                                                    Bake:{" "}
                                                                    {formatDate(
                                                                        inventory.bake_date
                                                                    )}
                                                                </span>
                                                                <span className="text-xs text-gray-400">
                                                                    Order by:{" "}
                                                                    {formatDate(
                                                                        inventory.order_deadline
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                            {inventory.is_active ? (
                                                                <Badge variant="success">
                                                                    Active
                                                                </Badge>
                                                            ) : (
                                                                <Badge variant="danger">
                                                                    Inactive
                                                                </Badge>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link
                                                                    href={route(
                                                                        "admin.weekly-inventories.show",
                                                                        inventory.id
                                                                    )}
                                                                    className="text-blue-600 hover:text-blue-900"
                                                                >
                                                                    View
                                                                </Link>
                                                                <Link
                                                                    href={route(
                                                                        "admin.weekly-inventories.edit",
                                                                        inventory.id
                                                                    )}
                                                                    className="text-amber-600 hover:text-amber-900"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <Link
                                                                    href={route(
                                                                        "admin.weekly-inventories.destroy",
                                                                        inventory.id
                                                                    )}
                                                                    method="delete"
                                                                    as="button"
                                                                    className="text-red-600 hover:text-red-900"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            !confirm(
                                                                                "Are you sure you want to delete this inventory?"
                                                                            )
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Link>
                                                            </div>
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
                                                    No inventory items found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Content>
                        {weeklyInventories.links && (
                            <Card.Footer>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing {weeklyInventories.from} to{" "}
                                        {weeklyInventories.to} of{" "}
                                        {weeklyInventories.total} inventory
                                        items
                                    </div>
                                    <div className="flex space-x-2">
                                        {weeklyInventories.links.map(
                                            (link, i) => (
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
                                            )
                                        )}
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
