import { Divider } from "@nextui-org/react";
import { IoIosStar } from "react-icons/io";
import { bebas } from "../fonts";

export const Cartelera = () => {
  return (
    <div className="flex items-center flex-col w-full justify-center p-8  gap-2">
      <div className="flex items-center justify-center  gap-5">
        <IoIosStar size={40} className="pb-1 " />
        <h1 className={`${bebas.className} text-6xl `}>CARTELERA</h1>
        <IoIosStar size={40} className="pb-1" />
      </div>
      <Divider className=" h-1 w-[90%]" />
    </div>
  );
};
