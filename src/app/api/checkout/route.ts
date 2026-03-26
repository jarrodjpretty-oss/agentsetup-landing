import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "AgentSetup - One-Time Setup",
          },
          unit_amount: 1100000,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/success`,
    cancel_url: `${origin}/`,
  });

  return Response.json({ url: session.url });
}
