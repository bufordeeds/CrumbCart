import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function WeeklyInventoriesEdit({ weeklyInventory, breadTypes }) {
    // Check if all required properties exist
    const hasRequiredProps =
        weeklyInventory &&
        typeof weeklyInventory.bread_type_id !== "undefined" &&
        typeof weeklyInventory.available_quantity !== "undefined" &&
        typeof weeklyInventory.week_number !== "undefined" &&
        typeof weeklyInventory.year !== "undefined";

    // Initialize form with default values if properties are missing
    const { data, setData, put, processing, errors } = useForm({
        bread_type_id: hasRequiredProps ? weeklyInventory.bread_type_id : "",
        available_quantity: hasRequiredProps
            ? weeklyInventory.available_quantity
            : 0,
        bake_date: hasRequiredProps ? weeklyInventory.bake_date : "",
        order_deadline: hasRequiredProps ? weeklyInventory.order_deadline : "",
        week_number: hasRequiredProps ? weeklyInventory.week_number : 1,
        year: hasRequiredProps
            ? weeklyInventory.year
            : new Date().getFullYear(),
        is_active: hasRequiredProps ? weeklyInventory.is_active : true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.weekly-inventories.update", weeklyInventory.id));
    };

    // Format date for input fields (YYYY-MM-DD)
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            return date.toISOString().split("T")[0];
        } catch (error) {
            console.error("Date formatting error:", error);
            return "";
        }
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Inventory
                </h2>
            }
        >
            <Head
                title={`Edit Inventory - ${
                    weeklyInventory.bread_type
                        ? weeklyInventory.bread_type.name
                        : "Loading..."
                }`}
            />

            <div className="py-8">
                <Container>
                    <Card>
                        <Card.Header>
                            <Card.Title>Edit Weekly Inventory</Card.Title>
                        </Card.Header>
                        <form onSubmit={handleSubmit}>
                            <Card.Content>
                                <div className="space-y-6">
                                    {/* Bread Type Selection */}
                                    <div>
                                        <InputLabel
                                            htmlFor="bread_type_id"
                                            value="Bread Type"
                                        />
                                        <select
                                            id="bread_type_id"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            value={data.bread_type_id}
                                            onChange={(e) =>
                                                setData(
                                                    "bread_type_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select a bread type
                                            </option>
                                            {breadTypes.map((breadType) => (
                                                <option
                                                    key={breadType.id}
                                                    value={breadType.id}
                                                >
                                                    {breadType.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.bread_type_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Available Quantity */}
                                    <div>
                                        <InputLabel
                                            htmlFor="available_quantity"
                                            value="Available Quantity"
                                        />
                                        <TextInput
                                            id="available_quantity"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.available_quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "available_quantity",
                                                    e.target.value
                                                )
                                            }
                                            min="0"
                                        />
                                        <InputError
                                            message={errors.available_quantity}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Week Information */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <InputLabel
                                                htmlFor="week_number"
                                                value="Week Number"
                                            />
                                            <TextInput
                                                id="week_number"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.week_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "week_number",
                                                        e.target.value
                                                    )
                                                }
                                                min="1"
                                                max="53"
                                            />
                                            <InputError
                                                message={errors.week_number}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                htmlFor="year"
                                                value="Year"
                                            />
                                            <TextInput
                                                id="year"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.year}
                                                onChange={(e) =>
                                                    setData(
                                                        "year",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.year}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <InputLabel
                                                htmlFor="bake_date"
                                                value="Bake Date"
                                            />
                                            <TextInput
                                                id="bake_date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={formatDateForInput(
                                                    data.bake_date
                                                )}
                                                onChange={(e) =>
                                                    setData(
                                                        "bake_date",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.bake_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                htmlFor="order_deadline"
                                                value="Order Deadline"
                                            />
                                            <TextInput
                                                id="order_deadline"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={formatDateForInput(
                                                    data.order_deadline
                                                )}
                                                onChange={(e) =>
                                                    setData(
                                                        "order_deadline",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.order_deadline}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                            checked={data.is_active}
                                            onChange={(e) =>
                                                setData(
                                                    "is_active",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="is_active"
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            Active (available for ordering)
                                        </label>
                                        <InputError
                                            message={errors.is_active}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </Card.Content>
                            <Card.Footer className="flex justify-end space-x-2">
                                <Button
                                    href={route(
                                        "admin.weekly-inventories.show",
                                        weeklyInventory.id
                                    )}
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Update Inventory
                                </Button>
                            </Card.Footer>
                        </form>
                    </Card>
                </Container>
            </div>
        </AdminLayout>
    );
}
