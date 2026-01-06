import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSignature } from "@/lib/paystack";
import { updatePaymentStatus } from "@/actions/orders";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Validate webhook signature
    const isValid = validateWebhookSignature(body, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        await handleSuccessfulPayment(event.data);
        break;
      case "charge.failed":
        await handleFailedPayment(event.data);
        break;
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(data: {
  reference: string;
  metadata?: { orderId?: string };
}) {
  const orderId = data.metadata?.orderId;

  if (!orderId) {
    console.error("No order ID in payment metadata");
    return;
  }

  await updatePaymentStatus(orderId, "paid", data.reference);
  console.log(`Payment successful for order ${orderId}`);
}

async function handleFailedPayment(data: {
  reference: string;
  metadata?: { orderId?: string };
}) {
  const orderId = data.metadata?.orderId;

  if (!orderId) {
    console.error("No order ID in payment metadata");
    return;
  }

  await updatePaymentStatus(orderId, "failed", data.reference);
  console.log(`Payment failed for order ${orderId}`);
}
