<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class OrderConfirmationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The order instance.
     *
     * @var \App\Models\Order
     */
    protected $order;

    /**
     * Create a new message instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
        Log::info('OrderConfirmationMail created', [
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'total_price' => $order->total_price,
        ]);
    }

    /**
     * Build the message.
     */
    public function build()
    {
        try {
            Log::info('OrderConfirmationMail build method called', [
                'order_id' => $this->order->id,
            ]);

            $this->order->load('weeklyInventory.breadType', 'user');

            $breadType = $this->order->weeklyInventory->breadType->name;
            $quantity = $this->order->quantity;
            $totalPrice = '$' . number_format($this->order->total_price, 2);
            $pickupDate = $this->order->pickup_date->format('F j, Y');
            $customerName = $this->order->user->name;

            // Create HTML content for the email
            $html = "
                <h1>Order Confirmation</h1>
                <p>Dear {$customerName},</p>
                <p>Thank you for your order! We're excited to bake some delicious bread for you.</p>
                <p><strong>Order Details:</strong></p>
                <ul>
                    <li>Order #: {$this->order->id}</li>
                    <li>Bread Type: {$breadType}</li>
                    <li>Quantity: {$quantity}</li>
                    <li>Total Price: {$totalPrice}</li>
                    <li>Pickup Date: {$pickupDate}</li>
                    " . ($this->order->notes ? "<li>Notes: {$this->order->notes}</li>" : "") . "
                </ul>
                <p>Your bread will be ready for pickup on {$pickupDate}. If you need to make any changes to your order, please log in to your account and visit the Orders page.</p>
                <p>Thank you for choosing Crumb Cart!</p>
                <p>Warm regards,<br>The Crumb Cart Team</p>
            ";

            Log::info('OrderConfirmationMail content prepared', [
                'order_id' => $this->order->id,
                'to' => $this->order->user->email,
            ]);

            return $this->from(config('mail.from.address'), config('mail.from.name'))
                ->subject('Order Confirmation - #' . $this->order->id)
                ->html($html);
        } catch (\Exception $e) {
            Log::error('Error in OrderConfirmationMail build method', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}
