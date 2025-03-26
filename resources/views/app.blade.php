<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Handcrafted artisan sourdough bread, baked to perfection and delivered to your door.">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ config('app.name', 'Crumb Cart') }}">
        <meta property="og:description" content="Handcrafted artisan sourdough bread, baked to perfection and delivered to your door.">
        <meta property="og:image" content="{{ url('/images/bread-social.png') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="{{ config('app.name', 'Crumb Cart') }}">
        <meta property="twitter:description" content="Handcrafted artisan sourdough bread, baked to perfection and delivered to your door.">
        <meta property="twitter:image" content="{{ url('/images/bread-social.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
