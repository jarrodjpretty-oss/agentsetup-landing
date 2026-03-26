export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Wire up Supabase
  console.log("Booking received:", body);

  return Response.json({ success: true });
}
