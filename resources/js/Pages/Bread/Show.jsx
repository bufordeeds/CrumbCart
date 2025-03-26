import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useState } from "react";

export default function BreadShow({ breadType }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        weekly_inventory_id: breadType.weekly_inventories[0]?.id || "",
        quantity: 1,
        pickup_date: "",
        notes: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);

    // Get the current weekly inventory if available
    const currentInventory = breadType.weekly_inventories[0] || null;
    const isAvailable =
        currentInventory && currentInventory.available_quantity > 0;
    const isLowStock = isAvailable && currentInventory.available_quantity <= 3;

    // Format date for min attribute
    const formatDateForInput = (date) => {
        return new Date(date).toISOString().split("T")[0];
    };

    // Get tomorrow's date for min pickup date
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatDateForInput(tomorrow);
    };

    // Get the bake date + 3 days for max pickup date
    const getMaxPickupDate = () => {
        if (!currentInventory || !currentInventory.bake_date) return "";
        const maxDate = new Date(currentInventory.bake_date);
        maxDate.setDate(maxDate.getDate() + 3);
        return formatDateForInput(maxDate);
    };

    // Calculate total price
    const calculateTotal = () => {
        return (Number(breadType.price) * data.quantity).toFixed(2);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("orders.store"), {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            },
        });
    };

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Bread Details
                </h2>
            }
        >
            <Head title={breadType.name} />

            <div className="py-8">
                <Container>
                    <div className="mb-8">
                        <Button
                            href={route("bread.index")}
                            variant="outline"
                            className="mb-4"
                        >
                            &larr; Back to Bread Selection
                        </Button>

                        {showSuccess && (
                            <div className="mb-4 rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-green-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">
                                            Order placed successfully! View your
                                            orders in the{" "}
                                            <a
                                                href={route("orders.index")}
                                                className="font-bold underline"
                                            >
                                                Orders
                                            </a>{" "}
                                            section.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Bread Details */}
                            <div>
                                <Card>
                                    {breadType.image_path && (
                                        <Card.Image
                                            src={breadType.image_path}
                                            alt={breadType.name}
                                            className="aspect-[4/3] object-cover"
                                        />
                                    )}
                                    <Card.Header>
                                        <div className="flex items-center justify-between">
                                            <Card.Title>
                                                {breadType.name}
                                            </Card.Title>
                                            <div>
                                                {isAvailable ? (
                                                    isLowStock ? (
                                                        <Badge variant="warning">
                                                            Low Stock
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="success">
                                                            Available
                                                        </Badge>
                                                    )
                                                ) : (
                                                    <Badge variant="danger">
                                                        Sold Out
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <Card.Description>
                                            <div className="text-lg font-bold text-amber-800 mb-2">
                                                $
                                                {Number(
                                                    breadType.price
                                                ).toFixed(2)}
                                            </div>
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content>
                                        <div className="prose max-w-none">
                                            <p>{breadType.description}</p>
                                        </div>

                                        {currentInventory && (
                                            <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm">
                                                <div className="flex items-center text-amber-800 mb-2">
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span className="font-medium">
                                                        Fresh Weekly Batch
                                                    </span>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <div className="w-32 font-semibold">
                                                            Bake Date:
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                currentInventory.bake_date
                                                            ).toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    weekday:
                                                                        "long",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <div className="w-32 font-semibold">
                                                            Order By:
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                currentInventory.order_deadline
                                                            ).toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    weekday:
                                                                        "long",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                }
                                                            )}

                                                            {/* Countdown badge */}
                                                            {new Date() <
                                                                new Date(
                                                                    currentInventory.order_deadline
                                                                ) && (
                                                                <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                                    {Math.ceil(
                                                                        (new Date(
                                                                            currentInventory.order_deadline
                                                                        ) -
                                                                            new Date()) /
                                                                            (1000 *
                                                                                60 *
                                                                                60 *
                                                                                24)
                                                                    )}{" "}
                                                                    {Math.ceil(
                                                                        (new Date(
                                                                            currentInventory.order_deadline
                                                                        ) -
                                                                            new Date()) /
                                                                            (1000 *
                                                                                60 *
                                                                                60 *
                                                                                24)
                                                                    ) === 1
                                                                        ? "day"
                                                                        : "days"}{" "}
                                                                    left
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <div className="w-32 font-semibold">
                                                            Pickup Date:
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                new Date(
                                                                    currentInventory.bake_date
                                                                ).getTime() +
                                                                    86400000
                                                            ).toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    weekday:
                                                                        "long",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <div className="w-32 font-semibold">
                                                            Available:
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="font-bold text-amber-800 mr-1">
                                                                {
                                                                    currentInventory.available_quantity
                                                                }
                                                            </span>
                                                            loaves
                                                            {currentInventory.available_quantity <=
                                                                3 && (
                                                                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                                                    Low Stock
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 pt-3 border-t border-amber-200">
                                                    <p className="text-amber-800">
                                                        <span className="font-semibold">
                                                            Freshly Baked:
                                                        </span>{" "}
                                                        Each loaf is handcrafted
                                                        and baked fresh for this
                                                        week's batch.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </Card.Content>
                                </Card>
                            </div>

                            {/* Order Form */}
                            <div>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            Place Your Order
                                        </Card.Title>
                                        <Card.Description>
                                            Fill out the form below to order
                                            this bread
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content>
                                        {isAvailable ? (
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="hidden"
                                                    name="weekly_inventory_id"
                                                    value={
                                                        data.weekly_inventory_id
                                                    }
                                                />

                                                <div className="mb-4">
                                                    <InputLabel
                                                        htmlFor="quantity"
                                                        value="Quantity"
                                                    />
                                                    <TextInput
                                                        id="quantity"
                                                        type="number"
                                                        name="quantity"
                                                        min="1"
                                                        max={
                                                            currentInventory.available_quantity
                                                        }
                                                        value={data.quantity}
                                                        onChange={(e) =>
                                                            setData(
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 block w-full"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.quantity
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <InputLabel
                                                        htmlFor="pickup_date"
                                                        value="Pickup Date"
                                                    />
                                                    <TextInput
                                                        id="pickup_date"
                                                        type="date"
                                                        name="pickup_date"
                                                        min={getTomorrow()}
                                                        max={getMaxPickupDate()}
                                                        value={data.pickup_date}
                                                        onChange={(e) =>
                                                            setData(
                                                                "pickup_date",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 block w-full"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.pickup_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Pickup available within
                                                        3 days of baking
                                                    </p>
                                                </div>

                                                <div className="mb-4">
                                                    <InputLabel
                                                        htmlFor="notes"
                                                        value="Notes"
                                                    />
                                                    <textarea
                                                        id="notes"
                                                        name="notes"
                                                        value={data.notes}
                                                        onChange={(e) =>
                                                            setData(
                                                                "notes",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        rows="3"
                                                    ></textarea>
                                                    <InputError
                                                        message={errors.notes}
                                                        className="mt-2"
                                                    />
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Any special requests or
                                                        instructions
                                                    </p>
                                                </div>

                                                <div className="mb-6 rounded-md bg-amber-50 p-4">
                                                    <div className="flex justify-between">
                                                        <span className="font-semibold">
                                                            Total Price:
                                                        </span>
                                                        <span className="text-lg font-bold text-amber-800">
                                                            ${calculateTotal()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end">
                                                    <Button
                                                        type="submit"
                                                        variant="primary"
                                                        disabled={processing}
                                                    >
                                                        Place Order
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500 mb-4">
                                                    Sorry, this bread is
                                                    currently sold out.
                                                </p>
                                                <Button
                                                    href={route("bread.index")}
                                                    variant="primary"
                                                >
                                                    Browse Other Breads
                                                </Button>
                                            </div>
                                        )}
                                    </Card.Content>
                                </Card>

                                <Card className="mt-4">
                                    <Card.Header>
                                        <Card.Title>
                                            Pickup Information
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Content>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Pickup Location
                                                </h3>
                                                <p className="mt-1 text-gray-700">
                                                    123 Bakery Street
                                                    <br />
                                                    Austin, TX 78701
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">
                                                    Pickup Hours
                                                </h3>
                                                <p className="mt-1 text-gray-700">
                                                    Saturday: 9:00 AM - 12:00 PM
                                                    <br />
                                                    Sunday: 10:00 AM - 1:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    </Card.Content>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
}
