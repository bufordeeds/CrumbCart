import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <Container>
                    <Grid cols={1} gap="lg">
                        {/* Welcome Card */}
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    Welcome, {auth.user.name}!
                                </Card.Title>
                                <Card.Description>
                                    Your sourdough bread dashboard
                                </Card.Description>
                            </Card.Header>
                            <Card.Content>
                                <p className="mb-4 text-gray-700">
                                    From here you can browse available bread,
                                    place orders, and track your deliveries.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        href={route("bread.index")}
                                        variant="primary"
                                    >
                                        Browse Bread
                                    </Button>
                                    <Button
                                        href={route("orders.index")}
                                        variant="outline"
                                    >
                                        View Orders
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Quick Actions</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <Grid cols={2} gap="md" className="mb-4">
                                    <Grid.Item>
                                        <Button
                                            href={route("bread.index")}
                                            variant="ghost"
                                            fullWidth
                                            className="justify-start p-4 h-24"
                                        >
                                            <div className="flex flex-col items-start">
                                                <span className="text-lg font-medium">
                                                    Browse Catalog
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    See this week's bread
                                                </span>
                                            </div>
                                        </Button>
                                    </Grid.Item>
                                    <Grid.Item>
                                        <Button
                                            href={route("orders.index")}
                                            variant="ghost"
                                            fullWidth
                                            className="justify-start p-4 h-24"
                                        >
                                            <div className="flex flex-col items-start">
                                                <span className="text-lg font-medium">
                                                    My Orders
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    View order history
                                                </span>
                                            </div>
                                        </Button>
                                    </Grid.Item>
                                    <Grid.Item>
                                        <Button
                                            href={route("profile.edit")}
                                            variant="ghost"
                                            fullWidth
                                            className="justify-start p-4 h-24"
                                        >
                                            <div className="flex flex-col items-start">
                                                <span className="text-lg font-medium">
                                                    Profile
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Update your details
                                                </span>
                                            </div>
                                        </Button>
                                    </Grid.Item>
                                    {auth.user.is_admin && (
                                        <Grid.Item>
                                            <Button
                                                href={route("admin.dashboard")}
                                                variant="ghost"
                                                fullWidth
                                                className="justify-start p-4 h-24 bg-amber-50"
                                            >
                                                <div className="flex flex-col items-start">
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-medium">
                                                            Admin Panel
                                                        </span>
                                                        <Badge
                                                            variant="primary"
                                                            className="ml-2"
                                                        >
                                                            Admin
                                                        </Badge>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        Manage inventory &
                                                        orders
                                                    </span>
                                                </div>
                                            </Button>
                                        </Grid.Item>
                                    )}
                                </Grid>
                            </Card.Content>
                        </Card>
                    </Grid>
                </Container>
            </div>
        </MainLayout>
    );
}
