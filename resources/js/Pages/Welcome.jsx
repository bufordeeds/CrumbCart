import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import BreadLogo from "@/Components/BreadLogo";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Grid from "@/Components/Grid";
import Button from "@/Components/Button";
import Badge from "@/Components/Badge";

export default function Welcome({ auth, breadTypes = [] }) {
    // Featured bread types (limited to 3)
    const featuredBreadTypes = breadTypes.slice(0, 3);

    return (
        <MainLayout>
            <Head title="Welcome to CrumbCart" />

            {/* Hero Section */}
            <div className="relative bg-amber-800 py-16 text-white">
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <img
                        src="/images/hero-background.jpg"
                        alt="Sourdough bread background"
                        className="h-full w-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                </div>
                <Container className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                            Casey Lizaso's Artisan Sourdough
                        </h1>
                        <p className="mb-8 text-lg text-amber-100 md:text-xl">
                            Handcrafted with love, baked to perfection, and now
                            available for you to enjoy.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                            <Button
                                href={route("bread.index")}
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-amber-800 font-bold"
                            >
                                Browse Our Bread
                            </Button>
                            {!auth.user && (
                                <Button
                                    href={route("register")}
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white hover:text-amber-800 font-semibold"
                                >
                                    Create an Account
                                </Button>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            {/* About the Baker Section */}
            <div className="bg-amber-50 py-16">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-amber-800">
                                About the Baker
                            </h2>
                            <div className="mx-auto mb-6 h-1 w-24 bg-amber-500"></div>
                        </div>
                        <div className="flex flex-col items-center md:flex-row md:space-x-8">
                            <div className="mb-6 md:mb-0 md:w-1/3">
                                <div className="overflow-hidden rounded-full">
                                    <img
                                        src="/images/baker.jpg"
                                        alt="Casey Lizaso"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.src =
                                                "https://placehold.co/300x300/e2c08c/8b4513?text=CL";
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="mb-4 text-xl font-semibold text-amber-800">
                                    Meet Casey Lizaso
                                </h3>
                                <p className="mb-4 text-gray-700">
                                    What started as a passion for baking bread
                                    for family and friends has grown into
                                    something more. Casey's journey with
                                    sourdough began in her home kitchen,
                                    experimenting with different flours,
                                    techniques, and flavors to create the
                                    perfect loaf.
                                </p>
                                <p className="text-gray-700">
                                    Each loaf is handcrafted with care using
                                    traditional methods and the finest
                                    ingredients. Casey's commitment to quality
                                    and her love for sharing her creations with
                                    others is what inspired CrumbCart - bringing
                                    her artisan sourdough from her kitchen to
                                    your table.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Featured Bread Section */}
            <div className="py-16">
                <Container>
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-amber-800">
                            Our Featured Bread
                        </h2>
                        <div className="mx-auto mb-6 h-1 w-24 bg-amber-500"></div>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Discover our selection of artisan sourdough bread,
                            each loaf crafted with care and attention to detail.
                        </p>
                    </div>

                    {featuredBreadTypes.length > 0 ? (
                        <>
                            <Grid
                                cols={1}
                                gap="lg"
                                className="mb-8 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {featuredBreadTypes.map((breadType) => (
                                    <Card key={breadType.id} className="h-full">
                                        {breadType.image_path && (
                                            <Card.Image
                                                src={breadType.image_path}
                                                alt={breadType.name}
                                                className="aspect-[4/3] object-cover"
                                                onError={(e) => {
                                                    e.target.src = `https://placehold.co/800x600/e2c08c/8b4513?text=${encodeURIComponent(
                                                        breadType.name
                                                    )}`;
                                                }}
                                            />
                                        )}
                                        <Card.Header>
                                            <Card.Title>
                                                {breadType.name}
                                            </Card.Title>
                                            <Card.Description>
                                                {breadType.description?.substring(
                                                    0,
                                                    100
                                                )}
                                                {breadType.description?.length >
                                                100
                                                    ? "..."
                                                    : ""}
                                            </Card.Description>
                                        </Card.Header>
                                        <Card.Content>
                                            <div className="mb-4 text-lg font-bold text-amber-800">
                                                $
                                                {breadType.price
                                                    ? breadType.price.toFixed(2)
                                                    : "0.00"}
                                            </div>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Button
                                                href={route(
                                                    "bread.show",
                                                    breadType.id
                                                )}
                                                variant="primary"
                                                size="sm"
                                                className="w-full"
                                            >
                                                View Details
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                ))}
                            </Grid>
                            <div className="text-center">
                                <Button
                                    href={route("bread.index")}
                                    variant="outline"
                                    size="lg"
                                    className="border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
                                >
                                    View All Bread
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Card className="bg-amber-50 p-8 text-center">
                            <p className="text-lg text-gray-600">
                                Our weekly bread selection will be available
                                soon. Check back later!
                            </p>
                            <div className="mt-4">
                                <Button
                                    href={route("bread.index")}
                                    variant="primary"
                                    size="lg"
                                >
                                    Visit Bread Catalog
                                </Button>
                            </div>
                        </Card>
                    )}
                </Container>
            </div>

            {/* How It Works Section */}
            <div className="bg-amber-50 py-16">
                <Container>
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-amber-800">
                            How It Works
                        </h2>
                        <div className="mx-auto mb-6 h-1 w-24 bg-amber-500"></div>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Ordering fresh sourdough bread is simple. Here's how
                            our weekly process works:
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl">
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-800">
                                    1
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-amber-800">
                                    Browse & Order
                                </h3>
                                <p className="text-gray-600">
                                    Select from our weekly bread offerings and
                                    place your order by Wednesday.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-800">
                                    2
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-amber-800">
                                    Baking Day
                                </h3>
                                <p className="text-gray-600">
                                    We bake your bread fresh on Friday using
                                    traditional sourdough methods.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-800">
                                    3
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-amber-800">
                                    Pickup
                                </h3>
                                <p className="text-gray-600">
                                    Collect your fresh bread on Saturday morning
                                    between 9am and 12pm.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Quality Highlights Section */}
            <div className="py-16">
                <Container>
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-amber-800">
                            Why Choose Our Sourdough
                        </h2>
                        <div className="mx-auto mb-6 h-1 w-24 bg-amber-500"></div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="h-full bg-white">
                            <Card.Content className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                    <svg
                                        className="h-6 w-6 text-amber-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-amber-800">
                                    Artisan Quality
                                </h3>
                                <p className="text-gray-600">
                                    Each loaf is handcrafted with care and
                                    attention to detail.
                                </p>
                            </Card.Content>
                        </Card>

                        <Card className="h-full bg-white">
                            <Card.Content className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                    <svg
                                        className="h-6 w-6 text-amber-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-amber-800">
                                    Natural Ingredients
                                </h3>
                                <p className="text-gray-600">
                                    We use only the finest, natural ingredients
                                    with no additives or preservatives.
                                </p>
                            </Card.Content>
                        </Card>

                        <Card className="h-full bg-white">
                            <Card.Content className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                    <svg
                                        className="h-6 w-6 text-amber-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-amber-800">
                                    Slow Fermentation
                                </h3>
                                <p className="text-gray-600">
                                    Our sourdough is slowly fermented for
                                    enhanced flavor and digestibility.
                                </p>
                            </Card.Content>
                        </Card>

                        <Card className="h-full bg-white">
                            <Card.Content className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                                    <svg
                                        className="h-6 w-6 text-amber-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-amber-800">
                                    Baked Fresh
                                </h3>
                                <p className="text-gray-600">
                                    Every loaf is baked fresh for weekend
                                    pickup, ensuring maximum freshness.
                                </p>
                            </Card.Content>
                        </Card>
                    </div>
                </Container>
            </div>

            {/* Call to Action Section */}
            <div className="bg-amber-800 py-16 text-white">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold">
                            Ready to Order?
                        </h2>
                        <p className="mb-8 text-amber-100">
                            Join us and experience the taste of authentic,
                            handcrafted sourdough bread.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                            <Button
                                href={route("bread.index")}
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-amber-800 font-bold"
                            >
                                Browse Our Bread
                            </Button>
                            {!auth.user && (
                                <Button
                                    href={route("register")}
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white hover:text-amber-800 font-semibold"
                                >
                                    Create an Account
                                </Button>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
}
