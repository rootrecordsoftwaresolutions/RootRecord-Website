export async function GET() {
  return Response.json({
    status: "online",
    service: "rootrecord-public",
    timestamp: new Date().toISOString()
  });
}
