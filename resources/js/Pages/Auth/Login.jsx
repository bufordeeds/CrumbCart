import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Login({ status, canResetPassword }) {
    const [breadPun, setBreadPun] = useState("");

    const breadPuns = [
        "Loaf at first sight!",
        "You're on a roll today!",
        "Let's get this bread!",
        "Feeling crumby? Sign in for a butter day!",
        "Wheat love to see you again!",
        "You're the best thing since sliced bread!",
        "Bread-y to place your order?",
        "Don't be crusty, sign in!",
        "Flour power activated!",
        "Dough-n't worry, we've got you covered!",
        "Bread-y or not, here we crumb!",
        "Rye are you so awesome?",
        "Sourdough you want to order some bread?",
        "We knead you back!",
        "You deserve to be treated like royalty... or should we say, loaf-alty?",
        "Life is what you bake it!",
        "Feeling down? That's a pain we can help with!",
        "Welcome back! We're so happy you're here, we could just crust!",
        "Bread-y to rise and shine?",
        "Donut worry, be happy!",
        "You're looking bread-tastic today!",
        "Bread puns are the yeast of my worries!",
        "Welcome back! We're so excited, we've got butterflies in our loaves!",
        "Bread-y to roll with the punches?",
        "Focaccia attention please: you're awesome!",
        "Ciabatta believe it's time to order more bread!",
        "Wheat meet again, my friend!",
        "Bread-y, set, dough!",
        "You're looking so fresh-baked today!",
        "Welcome back! We're on a roll today!",
    ];

    useEffect(() => {
        // Select a random pun on component mount
        const randomIndex = Math.floor(Math.random() * breadPuns.length);
        setBreadPun(breadPuns[randomIndex]);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-amber-800">
                    Welcome Back
                </h2>
                <p className="mt-2 text-gray-600">
                    Sign in to your account to place orders and track your
                    deliveries
                </p>
                <p className="mt-3 italic text-amber-600 text-sm font-medium">
                    {breadPun}
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-6 flex flex-col space-y-4">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={processing}
                    >
                        Log in
                    </Button>

                    <div className="flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-amber-700 hover:text-amber-900 focus:outline-none"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <Link
                            href={route("register")}
                            className="text-sm text-amber-700 hover:text-amber-900 focus:outline-none"
                        >
                            Need an account? Register
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
