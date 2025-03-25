import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function BreadTypesIndex({ breadTypes }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Bread Types
                </h2>
            }
        >
            <Head title="Bread Types" />

            <div className="py-8">
                <Container>
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manage Bread Types
                        </h1>
                        <Button
                            href={route("admin.bread-types.create")}
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
                            Add New Bread Type
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
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                Price
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
                                        {breadTypes.data.length > 0 ? (
                                            breadTypes.data.map((breadType) => (
                                                <tr key={breadType.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center">
                                                            {breadType.image_path ? (
                                                                <img
                                                                    src={
                                                                        breadType.image_path
                                                                    }
                                                                    alt={
                                                                        breadType.name
                                                                    }
                                                                    className="mr-3 h-10 w-10 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="mr-3 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                                                    <span className="text-amber-800">
                                                                        {breadType.name.charAt(
                                                                            0
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {
                                                                        breadType.name
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                                    {breadType.description.substring(
                                                                        0,
                                                                        50
                                                                    )}
                                                                    {breadType
                                                                        .description
                                                                        .length >
                                                                    50
                                                                        ? "..."
                                                                        : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        $
                                                        {parseFloat(
                                                            breadType.price
                                                        ).toFixed(2)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {breadType.is_active ? (
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
                                                                    "admin.bread-types.show",
                                                                    breadType.id
                                                                )}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "admin.bread-types.edit",
                                                                    breadType.id
                                                                )}
                                                                className="text-amber-600 hover:text-amber-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "admin.bread-types.destroy",
                                                                    breadType.id
                                                                )}
                                                                method="delete"
                                                                as="button"
                                                                className="text-red-600 hover:text-red-900"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        !confirm(
                                                                            "Are you sure you want to delete this bread type?"
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
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                                >
                                                    No bread types found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Content>
                        {breadTypes.links && (
                            <Card.Footer>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing {breadTypes.from} to{" "}
                                        {breadTypes.to} of {breadTypes.total}{" "}
                                        bread types
                                    </div>
                                    <div className="flex space-x-2">
                                        {breadTypes.links.map((link, i) => (
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
