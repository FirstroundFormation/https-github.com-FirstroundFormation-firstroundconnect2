import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(key);
}

export async function createConnectedAccount(email: string) {
  const stripe = getStripe();
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: { transfers: { requested: true } },
  });
  return account;
}

export async function createAccountLink(accountId: string, refreshUrl: string, returnUrl: string) {
  const stripe = getStripe();
  return stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
}

export async function createPaymentIntent(amountCents: number, stripeAccountId: string, metadata: Record<string, string>) {
  const stripe = getStripe();
  const fee = Math.round(amountCents * 0.20);
  return stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'eur',
    application_fee_amount: fee,
    transfer_data: { destination: stripeAccountId },
    metadata,
  });
}

export async function createTransfer(amountCents: number, stripeAccountId: string, bookingId: string) {
  const stripe = getStripe();
  return stripe.transfers.create({
    amount: Math.round(amountCents * 0.80),
    currency: 'eur',
    destination: stripeAccountId,
    metadata: { booking_id: bookingId },
  });
}
