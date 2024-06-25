import { movies } from "@/app/movies";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params);
  const movieData = movies.find((movie) => movie.id === parseInt(params.id));

  return Response.json(movieData);
}
