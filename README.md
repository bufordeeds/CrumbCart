<p align="center"><img src="public/images/bread-social.png" width="400" alt="CrumbCart Logo"></p>

<p align="center">
<a href="https://crumb-cart.com"><img src="https://img.shields.io/badge/Live-crumb--cart.com-brightgreen" alt="Live Site"></a>
<a href="https://laravel.com"><img src="https://img.shields.io/badge/Built%20with-Laravel-red" alt="Built with Laravel"></a>
</p>

# CrumbCart

CrumbCart is an artisanal bread ordering platform that connects bread lovers with fresh, locally-baked goods. Our platform allows customers to browse available bread types, place orders for weekly pickup, and manage their bread subscriptions.

## Live Site

CrumbCart is now live at [https://crumb-cart.com/](https://crumb-cart.com/)

## Features

-   Browse weekly available bread types
-   Place and manage bread orders
-   User account management
-   Admin dashboard for inventory management
-   Weekly inventory tracking
-   Order processing and fulfillment

## Technology Stack

-   **Framework**: Laravel
-   **Frontend**: React with Inertia.js
-   **Styling**: Tailwind CSS
-   **Database**: MySQL

## Local Development

### Prerequisites

-   PHP 8.1+
-   Composer
-   Node.js & NPM
-   MySQL

### Setup

1. Clone the repository

```
git clone https://github.com/yourusername/crumb-cart.git
cd crumb-cart
```

2. Install dependencies

```
composer install
npm install
```

3. Configure environment

```
cp .env.example .env
php artisan key:generate
```

4. Set up database

```
php artisan migrate --seed
```

5. Start development servers

```
php artisan serve
npm run dev
```

## About Laravel

CrumbCart is built on Laravel, a web application framework with expressive, elegant syntax. Laravel takes the pain out of development by easing common tasks used in many web projects.

Laravel is accessible, powerful, and provides tools required for large, robust applications. For more information about Laravel, visit the [official documentation](https://laravel.com/docs).

## License

CrumbCart is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
