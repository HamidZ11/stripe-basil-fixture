import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Uses the Upcoming Invoice API, removed in Stripe's Basil release
// (2025-03-31.basil) in favor of Create Preview Invoice. This is the
// positive fixture for Patchwork's stripe_invoices_retrieve_upcoming rule.
export function previewCustomerInvoice(customerId: string) {
  return stripe.invoices.retrieveUpcoming({ customer: customerId });
}
