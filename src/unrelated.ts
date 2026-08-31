// Negative fixture: an unrelated class with a method of the same name.
// Patchwork's semantic analysis must prove this does NOT resolve to
// Stripe's Invoices resource, unlike src/billing.ts.
export class ReportGenerator {
  retrieveUpcoming(): string {
    return 'unrelated method, not Stripe';
  }
}
