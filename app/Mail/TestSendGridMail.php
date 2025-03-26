<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class TestSendGridMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
        Log::info('TestSendGridMail created');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // Log the from address
        Log::info('TestSendGridMail from address', [
            'from_address' => config('mail.from.address'),
            'from_name' => config('mail.from.name'),
        ]);

        return new Envelope(
            subject: 'Test SendGrid Web API',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.test-sendgrid',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
