import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Positive fixture for Patchwork's Invoice.subscription rule
// (basil-2025-03-31-adds-new-parent-field-to-invoicing-objects).
// Invoice.subscription was removed in Stripe's Basil release, replaced by
// invoice.parent.subscription_details.subscription. Destructuring the
// awaited Invoice is an ordinary, common real-world pattern -- this is
// exactly as much a usage of Invoice.subscription as a direct property
// read, and must be detected the same way.
export async function getLegacySubscriptionId(invoiceId: string): Promise<string | null> {
  const { subscription } = await stripe.invoices.retrieve(invoiceId);
  return subscription;
}
