"use client";

import { bebas } from "@/app/fonts";
import { Movie } from "@/app/interfaces/movieDataInterfaces";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";

import { useInView } from "react-intersection-observer";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const [movieList, setMovieList] = useState<Movie[]>([] as Movie[]);
  const [movieStartId, setMovieStartId] = useState(0);
  const [movieEndId, setMovieEndId] = useState(20);
  const [allMoviesLoaded, setAllMoviesLoaded] = useState(false);
  const { ref, inView } = useInView();

  const handleLoadMoreRef = useRef(handleLoadMore);
  handleLoadMoreRef.current = handleLoadMore;
  const fetchAllSeenMovieData = useCallback(
    async (startId: number, endId: number) => {
      try {
        const res = await fetch(
          `/api/movies/seen?startId=${startId}&endId=${endId}`
        );
        const data = await res.json();
        if (data.length === 0) {
          setAllMoviesLoaded(true);
        }
        const newMovieList = movieList.concat(data);
        setMovieList(newMovieList);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    },
    [setMovieList, movieList]
  );

  const fetchMovieDataRef = useRef(fetchAllSeenMovieData);
  fetchMovieDataRef.current = fetchAllSeenMovieData;

  useEffect(() => {
    if (inView) {
      console.log("fetching more movies");
      setTimeout(() => {
        handleLoadMoreRef.current();
      }, 1000);
    }
  }, [inView]); // Removemos movieEndId de las dependencias

  useEffect(() => {
    fetchMovieDataRef.current(movieStartId, movieEndId);
  }, [movieStartId, movieEndId]);

  function handleLoadMore() {
    const newStartId = movieEndId + 1;
    const newEndId = movieEndId + 20;
    setMovieStartId(newStartId);
    setMovieEndId(newEndId);
  }

  return (
    <main className="flex h-screen w-screen  flex-col items-center text-2xl overflow-hidden ">
      <div className="overflow-hidden text-ellipsis">
        {movieList.length === 0 ? (
          <div className="flex flex-col h-[60vh]  justify-center items-center ">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : (
          <ScrollShadow className="max-h-[70vh] overflow-y-scroll overflow-x-hidden  w-[90vw] ">
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col items-center justify-center  "
              >
                <Button
                  aria-label="Mostrar detalles de la película"
                  variant="light"
                  className=" text-2xl "
                  onPress={() => {
                    router.push("/movies/" + movie.id);
                  }}
                >
                  <h2
                    className={`${bebas.className} text-ellipsis whitespace-nowrap`}
                  >
                    {movie.title}
                  </h2>
                </Button>

                <Divider className="my-2 w-2/3 " />
              </div>
            ))}
            {!allMoviesLoaded && (
              <div className="my-4 flex justify-center">
                <CircularProgress size="lg" color="default" ref={ref} />
              </div>
            )}
          </ScrollShadow>
        )}
      </div>
    </main>
  );
}
