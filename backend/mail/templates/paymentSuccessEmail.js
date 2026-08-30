exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Payment Received</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left;
            }

            .details {
                background-color: #f5f5f5;
                border-radius: 8px;
                padding: 15px 20px;
                margin: 20px 0;
                text-align: left;
            }

            .details p {
                margin: 6px 0;
            }

            .highlight {
                font-weight: bold;
            }

            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="message">Payment Received</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>We've successfully received your payment. Here are the details:</p>
                <div class="details">
                    <p>Amount Paid: <span class="highlight">₹${amount}</span></p>
                    <p>Order ID: <span class="highlight">${orderId}</span></p>
                    <p>Payment ID: <span class="highlight">${paymentId}</span></p>
                </div>
                <p>Thank you for choosing StudyOrbit!</p>
            </div>
            <div class="support">If you have any questions about this payment, please reach out to us.</div>
        </div>
    </body>

    </html>`;
};