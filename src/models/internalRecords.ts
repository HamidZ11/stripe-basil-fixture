// Negative fixture: internal domain models, unrelated to Stripe, that
// happen to share property names and literal values with the changes
// under test (Invoice.subscription, Issuing Authorization.status).
// Patchwork's semantic analysis must prove these do NOT resolve to
// Stripe's types, unlike src/services/invoiceService.ts and
// src/services/issuingService.ts.

export interface InternalSubscription {
  subscription: string;
  renewsAt: Date;
}

export function describeSubscription(record: InternalSubscription): string {
  return `renews via ${record.subscription}`;
}

export type JobStatus = 'pending' | 'closed' | 'reversed';

export interface Job {
  status: JobStatus;
}

export function wasJobReversed(job: Job): boolean {
  return job.status === 'reversed';
}
