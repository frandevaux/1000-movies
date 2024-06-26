"use client";

import {
  Button,
  ButtonGroup,
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
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { movies } from "./movies";
import { bebas } from "./fonts";
import { TiArrowShuffle } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { getRandomMovieId } from "./shuffle";
export default function Home() {
  const router = useRouter();

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

        <ScrollShadow className="max-h-[70vh] ">
          {movies.map((movie) => (
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
        </ScrollShadow>
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
