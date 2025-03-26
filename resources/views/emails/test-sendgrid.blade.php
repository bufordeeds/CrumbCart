<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test SendGrid Web API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #e74c3c;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Testing SendGrid Web API</h1>

    <div class="content">
        <p>Hello from Crumb Cart!</p>
        <p>This is a test email sent using SendGrid's Web API integration with Laravel.</p>
        <p>If you're seeing this email, it means your SendGrid Web API integration is working correctly.</p>
    </div>

    <div class="footer">
        <p>This is an automated test email from Crumb Cart.</p>
        <p>Sent at: {{ now() }}</p>
    </div>
</body>
</html>
