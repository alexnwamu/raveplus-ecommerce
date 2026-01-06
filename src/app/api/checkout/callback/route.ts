import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction, fromKobo } from "@/lib/paystack";
import { updatePaymentStatus, getOrderByNumber } from "@/actions/orders";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reference = searchParams.get("reference");
  const trxref = searchParams.get("trxref");

  const paymentReference = reference || trxref;

  if (!paymentReference) {
    return NextResponse.redirect(
      new URL("/checkout?error=missing_reference", request.url)
    );
  }

  try {
    // Verify the transaction
    const verification = await verifyTransaction(paymentReference);

    if (!verification.status) {
      return NextResponse.redirect(
        new URL("/checkout?error=verification_failed", request.url)
      );
    }

    const { status, metadata } = verification.data;
    const orderNumber = (metadata as { orderNumber?: string })?.orderNumber;
    const orderId = (metadata as { orderId?: string })?.orderId;

    if (!orderId) {
      console.error("No order ID in payment metadata");
      return NextResponse.redirect(
        new URL("/checkout?error=invalid_order", request.url)
      );
    }

    if (status === "success") {
      // Update order payment status
      await updatePaymentStatus(orderId, "paid", paymentReference);

      // Redirect to order confirmation
      return NextResponse.redirect(
        new URL(`/order-confirmation/${orderNumber}`, request.url)
      );
    } else if (status === "failed") {
      await updatePaymentStatus(orderId, "failed", paymentReference);

      return NextResponse.redirect(
        new URL(`/checkout?error=payment_failed`, request.url)
      );
    } else {
      // Payment was abandoned or has other status
      return NextResponse.redirect(
        new URL(`/checkout?error=payment_incomplete`, request.url)
      );
    }
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.redirect(
      new URL("/checkout?error=server_error", request.url)
    );
  }
}
