import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";

export default function ProfileIndex({ auth }) {
    const user = auth.user;

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Profile
                </h2>
            }
        >
            <Head title="My Profile" />

            <div className="py-8">
                <Container>
                    <Grid cols={1} gap="lg" className="md:grid-cols-3">
                        {/* Profile Summary Card */}
                        <div className="md:col-span-1">
                            <Card>
                                <Card.Header>
                                    <Card.Title>Account Information</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="flex flex-col items-center space-y-4 pb-4">
                                        <div className="h-24 w-24 overflow-hidden rounded-full bg-amber-100 flex items-center justify-center">
                                            <span className="text-3xl font-bold text-amber-800">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold">
                                                {user.name}
                                            </h3>
                                            <p className="text-gray-500">
                                                {user.email}
                                            </p>
                                            {user.is_admin && (
                                                <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    Member Since
                                                </span>
                                                <span className="font-medium">
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    Total Orders
                                                </span>
                                                <Link
                                                    href={route("orders.index")}
                                                    className="font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    View Orders
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Content>
                                <Card.Footer>
                                    <Button
                                        href={route("profile.edit")}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Edit Profile
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </div>

                        {/* Profile Management Cards */}
                        <div className="space-y-6 md:col-span-2">
                            {/* Account Settings Card */}
                            <Card>
                                <Card.Header>
                                    <Card.Title>Account Settings</Card.Title>
                                    <Card.Description>
                                        Manage your account settings and
                                        preferences
                                    </Card.Description>
                                </Card.Header>
                                <Card.Content>
                                    <ul className="divide-y divide-gray-200">
                                        <li className="py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium">
                                                        Profile Information
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        Update your name and
                                                        email address
                                                    </p>
                                                </div>
                                                <Button
                                                    href={route("profile.edit")}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </li>
                                        <li className="py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium">
                                                        Password
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        Change your password
                                                    </p>
                                                </div>
                                                <Button
                                                    href={
                                                        route("profile.edit") +
                                                        "#password"
                                                    }
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </li>
                                        <li className="py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium">
                                                        Notification Preferences
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        Manage email
                                                        notifications
                                                    </p>
                                                </div>
                                                <Button
                                                    href="#"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled
                                                >
                                                    Coming Soon
                                                </Button>
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Content>
                            </Card>

                            {/* Delivery Addresses Card */}
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Delivery Information
                                    </Card.Title>
                                    <Card.Description>
                                        Manage your delivery preferences
                                    </Card.Description>
                                </Card.Header>
                                <Card.Content>
                                    <div className="rounded-md bg-amber-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className="h-5 w-5 text-amber-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-amber-800">
                                                    Pickup Only
                                                </h3>
                                                <div className="mt-2 text-sm text-amber-700">
                                                    <p>
                                                        Currently, we only offer
                                                        pickup at our bakery
                                                        location. Delivery
                                                        options will be
                                                        available in the future.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>

                            {/* Account Actions Card */}
                            <Card>
                                <Card.Header>
                                    <Card.Title>Account Actions</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-base font-medium text-gray-900">
                                                Delete Account
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Permanently delete your account
                                                and all associated data.
                                            </p>
                                            <div className="mt-3">
                                                <Button
                                                    href={
                                                        route("profile.edit") +
                                                        "#delete-account"
                                                    }
                                                    variant="danger"
                                                    size="sm"
                                                >
                                                    Delete Account
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>
                        </div>
                    </Grid>
                </Container>
            </div>
        </MainLayout>
    );
}
