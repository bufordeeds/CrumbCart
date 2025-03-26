<?php

namespace App\Providers;

use App\Mail\Transport\SendGridTransport;
use Illuminate\Mail\MailManager;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class SendGridServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        Log::info('SendGridServiceProvider registered');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Log::info('SendGridServiceProvider boot method called');

        $this->app->afterResolving(MailManager::class, function (MailManager $manager) {
            Log::info('MailManager resolved, extending with sendgrid transport');

            // Register a new 'sendgrid' transport
            $manager->extend('sendgrid', function ($config) {
                Log::info('SendGrid transport extension called', [
                    'api_key_provided' => !empty($config['api_key']),
                ]);

                // Create a new SendGrid transport instance using the Web API
                return new SendGridTransport($config['api_key']);
            });
        });
    }
}
