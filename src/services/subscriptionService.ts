import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Positive fixture for Patchwork's deterministic remediation of the
// Invoice.subscription rule (basil-2025-03-31-adds-new-parent-field-to-
// invoicing-objects): a direct, non-optional, non-destructured property
// read -- the exact call shape Patchwork's remediation recipe supports
// (see apps/api/src/remediation/recipes/invoice-subscription-to-parent.ts
// in the Patchwork repository). The existing invoiceService.ts fixture
// destructures this same field, which is correctly detected as AFFECTED
// but is out of scope for automatic remediation -- this file exists
// specifically to exercise the supported shape end to end.
export async function getInvoiceSubscriptionId(
  invoiceId: string,
): Promise<string | Stripe.Subscription | null> {
  const invoice = await stripe.invoices.retrieve(invoiceId);
  return (invoice.parent?.subscription_details?.subscription ?? null);
}
