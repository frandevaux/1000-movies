"use client";
import movies from "../app/movies.json";
import {
  Button,
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
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentMovie, setCurrentMovie] = useState(movies[0]);
  return (
    <main className="flex h-full flex-col items-center text-2xl overflow-hidden ">
      <div className="overflow-hidden text-ellipsis">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className="dark"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody className="flex items-center">
                  <h1>{currentMovie.title}</h1>
                  <Image
                    src={
                      "https://image.tmdb.org/t/p/w500/" +
                      currentMovie.poster_path
                    }
                    alt={currentMovie.title ?? "No title"}
                    width={200}
                    height={300}
                  />

                  <p>{currentMovie.overview}</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="success"
                    as={Link}
                    href={"https://letterboxd.com/tmdb/" + currentMovie.id}
                    onPress={onClose}
                  >
                    Letterboxd
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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
                  onOpen();
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
    </main>
  );
}
