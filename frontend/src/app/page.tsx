"use client";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { movies } from "./movies";
import { bebas } from "./fonts";
import { TiArrowShuffle } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { getRandomMovieId } from "./shuffle";
import { Movie } from "./interfaces/movieDataInterfaces";
export default function Home() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [movieList, setMovieList] = useState<Movie[]>([] as Movie[]);
  const fetchMovieData = async (startId: number, endId: number) => {
    try {
      const res = await fetch(`/api/movies?startId=${startId}&endId=${endId}`);
      const data = await res.json();

      setMovieList(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchMovieData(10, 20);
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    //console.log(savedScrollPosition);
    if (savedScrollPosition && listRef.current) {
      listRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, []);

  const handleScroll = () => {
    console.log(listRef.current?.scrollTop);
    if (listRef.current) {
      localStorage.setItem(
        "scrollPosition",
        listRef.current.scrollTop.toString()
      );
    }
  };

  return (
    <main className="flex h-screen w-screen  flex-col items-center text-2xl overflow-hidden ">
      <div className="overflow-hidden text-ellipsis">
        <div className="flex items-center flex-col w-full justify-center p-8  gap-2">
          <div className="flex items-center justify-center  gap-5">
            <IoIosStar size={40} className="pb-1 " />
            <h1 className={`${bebas.className} text-6xl `}>CARTELERA</h1>
            <IoIosStar size={40} className="pb-1" />
          </div>
          <Divider className=" h-1 w-[90%]" />
        </div>
        {movieList.length === 0 ? (
          <div className="flex flex-col h-[60vh]  justify-center items-center ">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : (
          <div
            className="max-h-[70vh] overflow-scroll "
            onScroll={handleScroll}
          >
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col items-center justify-center  "
              >
                <Button
                  variant="light"
                  className=" text-2xl "
                  onPress={() => {
                    router.push("/" + movie.id);
                  }}
                >
                  <h2
                    className={
                      movie.seen
                        ? `${bebas.className} text-ellipsis whitespace-nowrap line-through text-neutral-600 `
                        : `${bebas.className} text-ellipsis whitespace-nowrap`
                    }
                  >
                    {movie.title}
                  </h2>
                </Button>

                <Divider className="my-2 w-2/3 " />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex bottom-0 z-20 justify-center absolute pb-10  w-screen">
        <ButtonGroup>
          <Button
            className={`${bebas.className} text-3xl w-[20vw] h-[6vh] bg-transparent `}
            isIconOnly
            onPress={() => {
              let randomMovieId = getRandomMovieId();
              router.push("/" + randomMovieId);
            }}
          >
            <TiArrowShuffle />
          </Button>
          <Button
            className={`${bebas.className} text-3xl w-[20vw] h-[6vh] bg-transparent  `}
            isIconOnly
            onPress={() => {
              router.push("/");
            }}
          >
            <BiSolidMoviePlay />
          </Button>
          <Button
            className={`${bebas.className} text-xl w-[20vw] h-[6vh] bg-transparent `}
            isIconOnly
          >
            <FaCheck />
          </Button>
        </ButtonGroup>
      </div>
    </main>
  );
}
