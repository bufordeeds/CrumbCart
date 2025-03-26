<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class NewOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The order instance.
     *
     * @var \App\Models\Order
     */
    protected $order;

    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
        Log::info('NewOrderNotification created', [
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'total_price' => $order->total_price,
            'status' => $order->status,
        ]);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $channels = ['mail'];

        Log::info('Notification channels', [
            'order_id' => $this->order->id,
            'channels' => $channels,
            'notifiable' => $notifiable,
        ]);

        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        try {
            Log::info('toMail method called', [
                'order_id' => $this->order->id,
                'notifiable_type' => get_class($notifiable),
            ]);

            $this->order->load('weeklyInventory.breadType', 'user');

            $breadType = $this->order->weeklyInventory->breadType->name;
            $quantity = $this->order->quantity;
            $totalPrice = '$' . number_format($this->order->total_price, 2);
            $pickupDate = $this->order->pickup_date->format('F j, Y');
            $customerName = $this->order->user->name;
            $customerEmail = $this->order->user->email;

            $orderUrl = url('/admin/orders/' . $this->order->id);

            Log::info('Email content prepared', [
                'order_id' => $this->order->id,
                'bread_type' => $breadType,
                'quantity' => $quantity,
                'total_price' => $totalPrice,
                'pickup_date' => $pickupDate,
                'customer_name' => $customerName,
                'customer_email' => $customerEmail,
            ]);
        } catch (\Exception $e) {
            Log::error('Error in toMail method', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }

        // Log the from address
        Log::info('NewOrderNotification from address', [
            'from_address' => config('mail.from.address'),
            'from_name' => config('mail.from.name'),
        ]);

        // Create the mail message
        $mailMessage = (new MailMessage)
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('New Order Placed - #' . $this->order->id)
            ->greeting('New Order Alert!')
            ->line("A new order has been placed by {$customerName} ({$customerEmail}).")
            ->line("**Order Details:**")
            ->line("- Bread Type: {$breadType}")
            ->line("- Quantity: {$quantity}")
            ->line("- Total Price: {$totalPrice}")
            ->line("- Pickup Date: {$pickupDate}")
            ->line($this->order->notes ? "- Notes: {$this->order->notes}" : "")
            ->action('View Order Details', $orderUrl)
            ->line('Thank you for using Crumb Cart!');

        // Log the mail message
        Log::info('NewOrderNotification mail message created', [
            'order_id' => $this->order->id,
            'subject' => 'New Order Placed - #' . $this->order->id,
            'from' => [config('mail.from.address'), config('mail.from.name')],
            'to' => $notifiable instanceof \Illuminate\Notifications\AnonymousNotifiable
                ? $notifiable->routes['mail']
                : ($notifiable->email ?? 'unknown'),
        ]);

        return $mailMessage;
    }

    /**
     * Get the notification's recipients.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function routeNotificationForMail($notifiable)
    {
        try {
            Log::info('routeNotificationForMail method called', [
                'order_id' => $this->order->id,
                'notifiable_type' => get_class($notifiable),
            ]);

            $recipients = ['bufordeeds8@gmail.com', 'casey.lizaso@gmail.com'];

            Log::info('Routing notification to recipients', [
                'order_id' => $this->order->id,
                'recipients' => $recipients,
                'notifiable' => $notifiable,
            ]);

            // Return an array of email addresses
            return $recipients;
        } catch (\Exception $e) {
            Log::error('Error in routeNotificationForMail method', [
                'order_id' => $this->order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
