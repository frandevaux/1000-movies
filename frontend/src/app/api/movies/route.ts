export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  let movieData;

  try {
    const response = await fetch("http://localhost:9000/api/movies/", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    movieData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Error fetching data", { status: 500 });
  }

  if (!movieData) {
    // Manejo en caso de respuesta vacía
    return new Response("No data found", { status: 404 });
  }

  return new Response(JSON.stringify(movieData), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
