import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState, useEffect } from "react";

export default function OrdersEdit({
    order,
    users,
    weeklyInventories,
    statuses,
}) {
    // Check if all required properties exist
    const hasRequiredProps =
        order &&
        typeof order.user_id !== "undefined" &&
        typeof order.weekly_inventory_id !== "undefined" &&
        typeof order.quantity !== "undefined" &&
        typeof order.status !== "undefined";

    // Initialize form with default values if properties are missing
    const { data, setData, put, processing, errors } = useForm({
        user_id: hasRequiredProps ? order.user_id : "",
        weekly_inventory_id: hasRequiredProps ? order.weekly_inventory_id : "",
        quantity: hasRequiredProps ? order.quantity : 1,
        status: hasRequiredProps ? order.status : "pending",
        pickup_date: hasRequiredProps ? order.pickup_date : "",
        notes: hasRequiredProps ? order.notes || "" : "",
    });

    const [selectedInventory, setSelectedInventory] = useState(null);

    // Update selected inventory when weekly_inventory_id changes
    useEffect(() => {
        if (data.weekly_inventory_id) {
            const inventory = weeklyInventories.find(
                (inv) =>
                    inv.id.toString() === data.weekly_inventory_id.toString()
            );
            setSelectedInventory(inventory || null);
        } else {
            setSelectedInventory(null);
        }
    }, [data.weekly_inventory_id, weeklyInventories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.orders.update", order.id));
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
                    Edit Order
                </h2>
            }
        >
            <Head title={`Edit Order #${order.id}`} />

            <div className="py-8">
                <Container>
                    <Card>
                        <Card.Header>
                            <Card.Title>Edit Order #{order.id}</Card.Title>
                        </Card.Header>
                        <form onSubmit={handleSubmit}>
                            <Card.Content>
                                <div className="space-y-6">
                                    {/* Customer Selection */}
                                    <div>
                                        <InputLabel
                                            htmlFor="user_id"
                                            value="Customer"
                                        />
                                        <select
                                            id="user_id"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            value={data.user_id}
                                            onChange={(e) =>
                                                setData(
                                                    "user_id",
                                                    e.target.value
                                                )
                                            }
                                            disabled
                                        >
                                            <option value="">
                                                Select a customer
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name} ({user.email})
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.user_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Bread Selection */}
                                    <div>
                                        <InputLabel
                                            htmlFor="weekly_inventory_id"
                                            value="Bread"
                                        />
                                        <select
                                            id="weekly_inventory_id"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            value={data.weekly_inventory_id}
                                            onChange={(e) =>
                                                setData(
                                                    "weekly_inventory_id",
                                                    e.target.value
                                                )
                                            }
                                            disabled
                                        >
                                            <option value="">
                                                Select a bread type
                                            </option>
                                            {weeklyInventories.map(
                                                (inventory) => (
                                                    <option
                                                        key={inventory.id}
                                                        value={inventory.id}
                                                    >
                                                        {
                                                            inventory.bread_type
                                                                .name
                                                        }{" "}
                                                        - Week{" "}
                                                        {inventory.week_number}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <InputError
                                            message={errors.weekly_inventory_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Inventory Details (if selected) */}
                                    {order.weekly_inventory && (
                                        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                                            <h3 className="font-medium text-amber-800">
                                                Order Details
                                            </h3>
                                            <div className="mt-2 space-y-1 text-sm text-amber-700">
                                                <p>
                                                    <span className="font-semibold">
                                                        Bread Type:
                                                    </span>{" "}
                                                    {
                                                        order.weekly_inventory
                                                            .bread_type.name
                                                    }
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Price:
                                                    </span>{" "}
                                                    $
                                                    {
                                                        order.weekly_inventory
                                                            .bread_type.price
                                                    }{" "}
                                                    per loaf
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Total Price:
                                                    </span>{" "}
                                                    ${order.total_price}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Quantity:
                                                    </span>{" "}
                                                    {order.quantity} loaves
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Ordered On:
                                                    </span>{" "}
                                                    {formatDate(
                                                        order.created_at
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Status */}
                                    <div>
                                        <InputLabel
                                            htmlFor="status"
                                            value="Order Status"
                                        />
                                        <select
                                            id="status"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Pickup Date */}
                                    <div>
                                        <InputLabel
                                            htmlFor="pickup_date"
                                            value="Pickup Date"
                                        />
                                        <TextInput
                                            id="pickup_date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={formatDateForInput(
                                                data.pickup_date
                                            )}
                                            onChange={(e) =>
                                                setData(
                                                    "pickup_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.pickup_date}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <InputLabel
                                            htmlFor="notes"
                                            value="Notes (Optional)"
                                        />
                                        <textarea
                                            id="notes"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            value={data.notes}
                                            onChange={(e) =>
                                                setData("notes", e.target.value)
                                            }
                                            rows={3}
                                        />
                                        <InputError
                                            message={errors.notes}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </Card.Content>
                            <Card.Footer className="flex justify-end space-x-2">
                                <Button
                                    href={route("admin.orders.index")}
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Update Order
                                </Button>
                            </Card.Footer>
                        </form>
                    </Card>
                </Container>
            </div>
        </AdminLayout>
    );
}
