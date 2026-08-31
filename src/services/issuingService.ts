import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Positive fixture for Patchwork's Issuing Authorization.status rule
// (basil-2025-03-31-issuing-authorizations-expired). Stripe's Basil
// release introduced a new 'expired' status value, previously conflated
// with 'reversed'. Destructuring the awaited Authorization before
// comparing status is an ordinary, common real-world pattern -- this
// legacy comparison now silently misses the split-out 'expired' case.
export async function wasAuthorizationReversed(authorizationId: string): Promise<boolean> {
  const { status } = await stripe.issuing.authorizations.retrieve(authorizationId);
  return status === 'reversed';
}
