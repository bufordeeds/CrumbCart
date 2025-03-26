<?php

namespace App\Mail\Transport;

use Illuminate\Support\Facades\Log;
use SendGrid;
use SendGrid\Mail\Mail;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Part\DataPart;

class SendGridTransport extends AbstractTransport
{
    /**
     * The SendGrid API client instance.
     *
     * @var \SendGrid
     */
    protected $client;

    /**
     * Get the string representation of the transport.
     *
     * @return string
     */
    public function __toString(): string
    {
        return 'sendgrid';
    }

    /**
     * Create a new SendGrid transport instance.
     *
     * @param  string  $apiKey
     * @return void
     */
    public function __construct(string $apiKey)
    {
        parent::__construct();

        Log::info('SendGridTransport constructor called (Web API)', [
            'api_key_provided' => !empty($apiKey),
        ]);

        $this->client = new SendGrid($apiKey);
    }

    /**
     * {@inheritdoc}
     */
    protected function doSend(SentMessage $message): void
    {
        $email = $message->getOriginalMessage();

        if (!$email instanceof Email) {
            throw new \RuntimeException('The message must be an instance of Symfony\Component\Mime\Email');
        }

        try {
            // Log before sending
            Log::info('Attempting to send email via SendGrid Web API', [
                'to' => $this->getTo($email),
                'subject' => $email->getSubject(),
            ]);

            $sendgridMail = $this->mapToSendGridMail($email);

            // Log the SendGrid mail object
            Log::info('SendGrid mail object', [
                'from' => $sendgridMail->getFrom(),
                'to' => $sendgridMail->getPersonalizations(),
                'subject' => $sendgridMail->getSubject(),
                'content_type' => $email->getHtmlBody() ? 'html' : 'text',
            ]);

            $response = $this->client->send($sendgridMail);

            // Log response
            Log::info('SendGrid API response', [
                'status_code' => $response->statusCode(),
                'body' => $response->body(),
                'headers' => $response->headers(),
            ]);

            if ($response->statusCode() >= 200 && $response->statusCode() < 300) {
                // Log success
                Log::info('Email sent successfully via SendGrid Web API', [
                    'to' => $this->getTo($email),
                    'subject' => $email->getSubject(),
                    'status_code' => $response->statusCode(),
                ]);
            } else {
                // Log error
                Log::error('Failed to send email via SendGrid Web API', [
                    'to' => $this->getTo($email),
                    'subject' => $email->getSubject(),
                    'status_code' => $response->statusCode(),
                    'body' => $response->body(),
                ]);

                throw new \Exception('SendGrid API error: ' . $response->body());
            }
        } catch (\Exception $e) {
            // Log error
            Log::error('Exception while sending email via SendGrid Web API', [
                'to' => $this->getTo($email),
                'subject' => $email->getSubject(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Re-throw the exception
            throw $e;
        }
    }

    /**
     * Map Laravel's message to SendGrid's Mail.
     *
     * @param  \Symfony\Component\Mime\Email  $email
     * @return \SendGrid\Mail\Mail
     */
    protected function mapToSendGridMail(Email $email): Mail
    {
        $mail = new Mail();

        // Set subject
        $mail->setSubject($email->getSubject() ?? '');

        // Set from
        $fromAddress = $email->getFrom();
        if (!empty($fromAddress)) {
            $from = $fromAddress[0];
            $mail->setFrom($from->getAddress(), $from->getName() ?: null);
        }

        // Set to
        foreach ($email->getTo() as $to) {
            $mail->addTo($to->getAddress(), $to->getName() ?: null);
        }

        // Set cc
        foreach ($email->getCc() as $cc) {
            $mail->addCc($cc->getAddress(), $cc->getName() ?: null);
        }

        // Set bcc
        foreach ($email->getBcc() as $bcc) {
            $mail->addBcc($bcc->getAddress(), $bcc->getName() ?: null);
        }

        // Set reply to
        foreach ($email->getReplyTo() as $replyTo) {
            $mail->setReplyTo($replyTo->getAddress(), $replyTo->getName() ?: null);
        }

        // Set content
        if ($email->getHtmlBody()) {
            $mail->addContent('text/html', $email->getHtmlBody());
        }

        if ($email->getTextBody()) {
            $mail->addContent('text/plain', $email->getTextBody());
        }

        // Set attachments
        foreach ($email->getAttachments() as $attachment) {
            if ($attachment instanceof DataPart) {
                $mail->addAttachment(
                    base64_encode($attachment->getBody()),
                    $attachment->getMediaType(),
                    $attachment->getFilename(),
                    'attachment'
                );
            }
        }

        return $mail;
    }

    /**
     * Get the recipients from the message.
     *
     * @param  \Symfony\Component\Mime\Email  $email
     * @return array
     */
    protected function getTo(Email $email): array
    {
        $to = array_merge(
            $email->getTo(),
            $email->getCc(),
            $email->getBcc()
        );

        return array_map(function (Address $address) {
            return $address->getAddress();
        }, $to);
    }
}
