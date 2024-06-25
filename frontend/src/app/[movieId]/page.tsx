"use client";
import { Button, Image, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../tmdbApi";
import { MovieData } from "../interfaces/movieDataInterface";
import { Bebas_Neue } from "next/font/google";
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const { movieId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<MovieData>({} as MovieData);
  // Aquí puedes hacer una llamada a la API o acceder a los datos de la película utilizando el movieId
  useEffect(() => {
    const fetchMovieData = async () => {
      await fetch("/api/movie/" + movieId)
        .then((res) => res.json())
        .then((data) => {
          setMovieData(data);
          console.log(data);
          setIsLoading(false);
        });
    };
    fetchMovieData();
  }, [movieId]);

  return (
    <main className=" flex h-screen flex-col items-center text-2xl overflow-hidden bg-cover">
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <div
            className=" brightness-50 blur-xl w-screen h-[110vh] fixed top-0 left-0 -z-2  bg-cover bg-center bg-no-repeat shadow-2xl"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`,
            }}
          ></div>
          <div className="absolute w-screen h-screen top-0 left-0  opacity-90 bg-gradient-to-b     from-black from-10% via-transparent to-black to-100%"></div>
          <div className=" z-20 w-screen h-screen text-white flex justify-center flex-col items-center p-10 gap-4">
            <Image
              src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
              alt={movieData.title ?? "No title"}
              width={200}
              height={300}
              className=" rounded-md   border-white border-2 "
            />
            <div className="flex flex-col items-center">
              <h1 className={`${bebas.className} text-4xl `}>
                {movieData.title}
              </h1>
              {movieData.title != movieData.original_title && (
                <h2 className={`text-xl `}>{movieData.original_title}</h2>
              )}

              <h3>{movieData.release_date}</h3>
            </div>

            <div className="flex flex-col gap-6 ">
              <div className="flex  justify-between ">
                <Button
                  color="success"
                  as={Link}
                  href={"https://letterboxd.com/tmdb/" + movieData.id}
                >
                  Letterboxd
                </Button>
                <Button
                  color="success"
                  as={Link}
                  href={"https://letterboxd.com/tmdb/" + movieData.id}
                >
                  No vista
                </Button>
              </div>
              <ScrollShadow className="max-h-[19vh] ">
                <p>{movieData.overview}</p>
              </ScrollShadow>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MoviePage;
