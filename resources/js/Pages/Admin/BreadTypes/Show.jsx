import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function BreadTypesShow({ breadType }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Bread Type Details
                </h2>
            }
        >
            <Head title={breadType.name} />

            <div className="py-8">
                <Container>
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {breadType.name}
                        </h1>
                        <div className="flex space-x-2">
                            <Button
                                href={route(
                                    "admin.bread-types.edit",
                                    breadType.id
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Edit
                            </Button>
                            <Link
                                href={route(
                                    "admin.bread-types.destroy",
                                    breadType.id
                                )}
                                method="delete"
                                as="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={(e) => {
                                    if (
                                        !confirm(
                                            "Are you sure you want to delete this bread type?"
                                        )
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
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
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                                Delete
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Bread Type Details */}
                        <div className="md:col-span-2">
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Bread Type Information
                                    </Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Status
                                            </h3>
                                            <div className="mt-1">
                                                {breadType.is_active ? (
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
                                                Price
                                            </h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">
                                                $
                                                {Number(
                                                    breadType.price
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Description
                                            </h3>
                                            <p className="mt-1 text-gray-900">
                                                {breadType.description}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Created At
                                            </h3>
                                            <p className="mt-1 text-gray-900">
                                                {new Date(
                                                    breadType.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">
                                                Last Updated
                                            </h3>
                                            <p className="mt-1 text-gray-900">
                                                {new Date(
                                                    breadType.updated_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>

                            {/* Weekly Inventory Section */}
                            {breadType.weeklyInventories &&
                                breadType.weeklyInventories.length > 0 && (
                                    <Card className="mt-6">
                                        <Card.Header>
                                            <Card.Title>
                                                Weekly Inventory
                                            </Card.Title>
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
                                                                Week
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                            >
                                                                Available
                                                                Quantity
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                            >
                                                                Ordered
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                            >
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {breadType.weeklyInventories.map(
                                                            (inventory) => (
                                                                <tr
                                                                    key={
                                                                        inventory.id
                                                                    }
                                                                >
                                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                                        {new Date(
                                                                            inventory.available_date
                                                                        ).toLocaleDateString()}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                                        {
                                                                            inventory.available_quantity
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                                        {inventory.ordered_quantity ||
                                                                            0}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                                        {inventory.available_quantity -
                                                                            (inventory.ordered_quantity ||
                                                                                0) >
                                                                        0 ? (
                                                                            <Badge variant="success">
                                                                                Available
                                                                            </Badge>
                                                                        ) : (
                                                                            <Badge variant="danger">
                                                                                Sold
                                                                                Out
                                                                            </Badge>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                )}
                        </div>

                        {/* Bread Image */}
                        <div>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Bread Image</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    {breadType.image_path ? (
                                        <img
                                            src={breadType.image_path}
                                            alt={breadType.name}
                                            className="w-full rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center rounded-md bg-gray-100">
                                            <p className="text-gray-500">
                                                No image available
                                            </p>
                                        </div>
                                    )}
                                </Card.Content>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            href={route("admin.bread-types.index")}
                            variant="secondary"
                        >
                            Back to Bread Types
                        </Button>
                    </div>
                </Container>
            </div>
        </AdminLayout>
    );
}
