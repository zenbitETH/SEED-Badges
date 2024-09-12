import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  data: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, close, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-bit/60 backdrop-blur-md flex justify-center items-center" onClick={close}>
      <div className="max-w-xl overflow-hidden rounded-md bg-gray-200 relative p-6 pt-9">
        <div className="absolute top-0 left-0 bg-zen rounded-br-md rounded-tl-md px-4 py-1 font-roo text-sm xl:text-base">
          Evento No. {data?.eventId?.toString()}
        </div>
        <div className="absolute top-0 right-0 bg-bit rounded-tr-md rounded-bl-md px-4 py-1 text-white font-roo text-sm xl:text-base">
          Nv: {data?.level?.toString()}
        </div>
        <div className="absolute bottom-0 right-0 left-0 text-center bg-white hover:bg-gray-500 rounded-t-md w-fit mx-auto px-4 py-1 hover:text-white text-sm xl:text-base">
          <a
            className="text-xl"
            style={{ marginTop: "-1rem" }}
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_ATTESTATION_VIEW_URL}/${data.id}`}
          >
            Ver en registro público
          </a>
        </div>

        <div className="grid justify-center items-center text-center">
          <div className="xl:text-2xl md:text-xl font-bold font-roo">{data?.eventName}</div>
          <div className="mr-4">
            <Image
              src={"https://ipfs.io/ipfs/" + data?.badgeUri?.toString()}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full mx-auto my-3"
            />
          </div>
        </div>
        <div className="mb-9 text-center xl:text-2xl md:text-xl">
          <div className="font-roo">¡Felicidades!</div>
          <p className=" animate-pulse">
            SEED Badge otorgada a: <br /> {data?.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
