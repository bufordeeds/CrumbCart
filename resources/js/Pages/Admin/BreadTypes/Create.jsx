import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function BreadTypesCreate() {
    const { data, setData, post, processing, errors, setError } = useForm({
        name: "",
        description: "",
        price: "",
        image: null,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.bread-types.store"), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Basic validation
        if (file && file.size > 2 * 1024 * 1024) {
            setError("image", "Image must be less than 2MB");
            return;
        }

        setData("image", file);
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Bread Type
                </h2>
            }
        >
            <Head title="Add New Bread Type" />

            <div className="py-8">
                <Container>
                    <Card>
                        <Card.Header>
                            <Card.Title>Create Bread Type</Card.Title>
                        </Card.Header>
                        <form onSubmit={handleSubmit}>
                            <Card.Content>
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />
                                        <textarea
                                            id="description"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            required
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <InputLabel
                                            htmlFor="price"
                                            value="Price ($)"
                                        />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.price}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <InputLabel
                                            htmlFor="image"
                                            value="Image (Optional)"
                                        />
                                        <input
                                            id="image"
                                            type="file"
                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-amber-50 file:text-amber-700
                                                hover:file:bg-amber-100"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Upload an image of the bread (max
                                            2MB)
                                        </p>
                                        <InputError
                                            message={errors.image}
                                            className="mt-2"
                                        />
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
                                    href={route("admin.bread-types.index")}
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Create Bread Type
                                </Button>
                            </Card.Footer>
                        </form>
                    </Card>
                </Container>
            </div>
        </AdminLayout>
    );
}
