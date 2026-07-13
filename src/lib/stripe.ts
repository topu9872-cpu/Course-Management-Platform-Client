import 'server-only';
import Stripe from 'stripe';

// 1. Fail-fast validation: Ensure the key exists
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in your environment variables.');
}

// 2. Initialize and export a single, stable instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
});