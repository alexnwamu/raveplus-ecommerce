import { generatePaymentReference } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface PaystackTransactionOptions {
  email: string;
  amount: number; // In kobo (smallest currency unit)
  reference?: string;
  callback_url?: string;
  metadata?: {
    orderId?: string;
    orderNumber?: string;
    customFields?: Array<{
      display_name: string;
      variable_name: string;
      value: string | number;
    }>;
  };
}

interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
    metadata: object;
  };
}

const PAYSTACK_BASE_URL = "https://api.paystack.co";

/**
 * Initialize a Paystack transaction
 */
export async function initializeTransaction(
  options: PaystackTransactionOptions
): Promise<PaystackInitResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  const reference = options.reference || generatePaymentReference();

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: options.email,
      amount: options.amount,
      reference,
      callback_url: options.callback_url || `${siteConfig.url}/checkout/callback`,
      currency: siteConfig.currency.code,
      metadata: options.metadata,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to initialize transaction");
  }

  return response.json();
}

/**
 * Verify a Paystack transaction
 */
export async function verifyTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify transaction");
  }

  return response.json();
}

/**
 * Convert amount to kobo (Paystack uses smallest currency unit)
 */
export function toKobo(amountInNaira: number): number {
  return Math.round(amountInNaira * 100);
}

/**
 * Convert kobo to Naira
 */
export function fromKobo(amountInKobo: number): number {
  return amountInKobo / 100;
}

/**
 * Validate Paystack webhook signature
 */
export function validateWebhookSignature(
  body: string,
  signature: string
): boolean {
  const crypto = require("crypto");
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(body)
    .digest("hex");

  return hash === signature;
}

/**
 * Client-side Paystack popup integration
 * Note: This is for client-side use with the Paystack inline library
 */
export interface PaystackPopupConfig {
  email: string;
  amount: number; // In Naira (will be converted to kobo)
  reference?: string;
  publicKey?: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  metadata?: object;
}

export function createPaystackConfig(config: PaystackPopupConfig) {
  return {
    key: config.publicKey || process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: config.email,
    amount: toKobo(config.amount),
    ref: config.reference || generatePaymentReference(),
    currency: siteConfig.currency.code,
    metadata: config.metadata,
    callback: (response: { reference: string }) => {
      config.onSuccess(response.reference);
    },
    onClose: config.onClose,
  };
}
