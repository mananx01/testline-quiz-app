export async function GET(req, res) {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    const data = await response.json();
    return Response.json(data);
}
  