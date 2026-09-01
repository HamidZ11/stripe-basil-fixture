import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Positive fixture for Patchwork's Invoice.subscription rule
// (basil-2025-03-31-adds-new-parent-field-to-invoicing-objects).
// Invoice.subscription was removed in Stripe's Basil release, replaced by
// invoice.parent.subscription_details.subscription. A direct, non-
// optional property read -- the shape Patchwork's deterministic
// remediation recipe supports end to end (see
// apps/api/src/remediation/recipes/invoice-subscription-to-parent.ts in
// the Patchwork repository).
export async function getLegacySubscriptionId(invoiceId: string): Promise<string | Stripe.Subscription | null> {
  const invoice = await stripe.invoices.retrieve(invoiceId);
  return invoice.subscription;
}
