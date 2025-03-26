import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState, useEffect } from "react";

export default function OrdersCreate({ users, weeklyInventories }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        weekly_inventory_id: "",
        quantity: 1,
        pickup_date: "",
        notes: "",
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
        post(route("admin.orders.store"));
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create New Order
                </h2>
            }
        >
            <Head title="Create New Order" />

            <div className="py-8">
                <Container>
                    <Card>
                        <Card.Header>
                            <Card.Title>New Order</Card.Title>
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
                                            required
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
                                            required
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
                                                        {inventory.week_number}{" "}
                                                        (
                                                        {
                                                            inventory.available_quantity
                                                        }{" "}
                                                        available)
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
                                    {selectedInventory && (
                                        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                                            <h3 className="font-medium text-amber-800">
                                                Selected Bread Details
                                            </h3>
                                            <div className="mt-2 space-y-1 text-sm text-amber-700">
                                                <p>
                                                    <span className="font-semibold">
                                                        Type:
                                                    </span>{" "}
                                                    {
                                                        selectedInventory
                                                            .bread_type.name
                                                    }
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Price:
                                                    </span>{" "}
                                                    $
                                                    {
                                                        selectedInventory
                                                            .bread_type.price
                                                    }{" "}
                                                    per loaf
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Bake Date:
                                                    </span>{" "}
                                                    {formatDate(
                                                        selectedInventory.bake_date
                                                    )}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Available:
                                                    </span>{" "}
                                                    {
                                                        selectedInventory.available_quantity
                                                    }{" "}
                                                    loaves
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                        Order By:
                                                    </span>{" "}
                                                    {formatDate(
                                                        selectedInventory.order_deadline
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quantity */}
                                    <div>
                                        <InputLabel
                                            htmlFor="quantity"
                                            value="Quantity"
                                        />
                                        <TextInput
                                            id="quantity"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            min="1"
                                            max={
                                                selectedInventory
                                                    ? selectedInventory.available_quantity
                                                    : 999
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.quantity}
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
                                            value={data.pickup_date}
                                            onChange={(e) =>
                                                setData(
                                                    "pickup_date",
                                                    e.target.value
                                                )
                                            }
                                            min={
                                                selectedInventory
                                                    ? selectedInventory.bake_date
                                                    : ""
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
                                    Create Order
                                </Button>
                            </Card.Footer>
                        </form>
                    </Card>
                </Container>
            </div>
        </AdminLayout>
    );
}
