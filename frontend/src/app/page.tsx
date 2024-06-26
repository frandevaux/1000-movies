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

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentMovie, setCurrentMovie] = useState(movies[0]);
  return (
    <main className="flex h-full flex-col items-center text-2xl overflow-hidden ">
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
                  setCurrentMovie(movie);

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
        <div className="flex items-center w-full justify-center p-10">
          <ButtonGroup className="text-xl">
            <Button className={`${bebas.className} text-2xl `}>Random</Button>
            <Button className={`${bebas.className} text-2xl `}>Lista</Button>
            <Button className={`${bebas.className} text-2xl `}>Vistas</Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
