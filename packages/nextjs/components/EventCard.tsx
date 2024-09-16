import Image from "next/image";
import Link from "next/link";
import { CountdownMonths } from "./CountdownMonths";
import moment from "moment";
import { useAccount } from "wagmi";

export const EventCard = ({
  eventDetails,
  userData,
}: // connectedAddress,
// router,
{
  eventDetails: any;
  userData: any;
  connectedAddress: any;
  router: any;
}) => {
  const account = useAccount();

  // console.log(eventDetails.eventId, { userData, eventDetails });
  // console.log(eventDetails?.eventId, userData?.[0] == eventDetails?.eventId);
  // console.log(
  //   eventDetails?.eventId.toString() === "1"
  //     ? {
  //         id: eventDetails?.eventId.toString(),
  //         a: userData?.[0] == eventDetails?.eventId,
  //         b: userData?.[1].includes(eventDetails?.eventId),
  //         userData,
  //         eventDetails,
  //       }
  //     : null,
  // );
  return (
    <div
      className={`py-10 sm:p-10 ${
        userData && userData?.[1].includes(eventDetails?.eventId)
          ? "badge-granted"
          : Number(eventDetails.closingTimestamp) * 1000 < Date.now()
          ? "finalized-event"
          : "bg-gradient-to-b from-gray-200/60 to-gray-500/20"
      } rounded-md shadow-md relative cursor-pointer h-full group`}
    >
      <span className="text-xl absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-md backdrop-blur-md">
        {!(userData && userData?.[1].includes(eventDetails?.eventId)) &&
          Number(eventDetails.closingTimestamp) * 1000 < Date.now() &&
          "Evento Finalizado"}
        {userData && userData?.[1].includes(eventDetails?.eventId) && "¡Obtuviste esta Badge! 🎖️"}
      </span>

      {userData &&
      !userData?.[1].includes(eventDetails?.eventId) &&
      !(Number(eventDetails.closingTimestamp) * 1000 < Date.now()) &&
      Number(eventDetails.startTimestamp) > Date.now() ? (
        <Link
          href={`/quiz?eventId=${eventDetails?.eventId}`}
          className="text-xl text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-md backdrop-blur-md"
        >
          ¡Reclama esta Badge! 🎖️
        </Link>
      ) : null}
      {eventDetails.startTimestamp &&
      !(Number(eventDetails.startTimestamp) < Date.now()) &&
      !userData?.[1].includes(eventDetails?.eventId) ? (
        <Link
          href={`/event/${eventDetails?.eventId}/register`}
          className="text-xl text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-md backdrop-blur-md"
        >
          ¡Registrarse al evento!
        </Link>
      ) : null}
      {/* TODO: chequear con habacuc la condicion correcta para mostrar registrar a evento y reclamar badge */}

      {!account?.address && (
        <span className="text-xl text-white absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-md backdrop-blur-md">
          Conecta tu cartera web3 🦊 ↗️
        </span>
      )}
      <div className="absolute top-0 left-0 bg-zen text-black rounded-br-md rounded-tl-md px-4 py-1 font-roo text-sm">
        Evento {eventDetails.eventId.toString()} <span className="">/ Nv: {eventDetails.level.toString()}</span>
      </div>
      <div className="absolute top-0 right-0 text-black bg-white/70 hover:bg-zen rounded-tr-md rounded-bl-md px-4 py-1 hover:text-white font-roo text-sm">
        <Link href={`/event/${eventDetails.eventId}`} className="">
          Ver detalle
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 left-0 bg-gray-500/60 text-base  py-1 rounded-b-md text-white font-roo text-center">
        {!(Number(eventDetails.closingTimestamp) * 1000 < Date.now()) ? (
          <CountdownMonths timeToExpiration={Number(eventDetails.closingTimestamp) * 1000} />
        ) : (
          <span>Evento Finalizado</span>
        )}
      </div>
      <div className="flex flex-col justify-center items-center ">
        <span className="flex 2xl:text-lg font-bold font-roo px-5 items-center justify-center">
          {String(eventDetails.eventName)}
        </span>
        <span>
          {eventDetails.startTimestamp
            ? `Comienza: ${moment(Number(eventDetails.startTimestamp)).format("DD/MM/YYYY hh:mm")}`
            : null}
        </span>
        <div className="mx-auto rounded-full">
          <Image
            alt="Badge"
            width={150}
            height={150}
            className="rounded-full my-3"
            src={`https://ipfs.io/ipfs/${String(eventDetails?.badgeUri)}`}
          />
        </div>
      </div>
      <div className="col-span-3  font-roo text-center">
        <div className=" italic pb-3 text-white">Mentor: {String(eventDetails.mentorName)}</div>
      </div>
      {/*
      <div className="flex flex-row w-full justify-evenly">
        <button
          className={`${
            userData && userData?.[1].includes(eventDetails?.eventId)
              ? "bg-bit/100 text-white hover:cursor-not-allowed"
              : Number(eventDetails.closingTimestamp) * 1000 < Date.now()
              ? "bg-gray-500 text-white hover:bg-gray-500 hover:cursor-not-allowed"
              : "bg-gray-200/60"
          } rounded-md shadow-md relative cursor-pointer`}
          onClick={() => {
            if (
              !userData?.[1].includes(eventDetails?.eventId) &&
              connectedAddress &&
              eventDetails.level <= (userData?.[0] ?? 0)
            ) {
              router.push(`/quiz?eventId=${eventDetails.eventId.toString()}`);
            }
          }}
          disabled={
            !(
              !userData?.[1].includes(eventDetails?.eventId) &&
              connectedAddress &&
              eventDetails.level <= (userData?.[0] ?? 0)
            ) || Number(eventDetails.closingTimestamp) * 1000 < Date.now()
          }
        >
          Action Button
        </button>
      </div>
      */}
    </div>
  );
};
