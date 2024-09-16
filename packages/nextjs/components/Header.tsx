import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  const { address: connectedAddress } = useAccount();

  const menuLinks: HeaderMenuLink[] = [
    {
      label: "Eventos",
      href: "/",
    },
  ];

  if (connectedAddress) {
    const additionalLinks: HeaderMenuLink[] = [
      {
        label: "Perfil",
        href: "/profile",
      },
    ];

    if (
      [
        "0x4e087b926a0752c23b4dA800424547f5932bBD0c",
        "0xdA7773E91a396d592AD33146164dA6d7d2Fda9B6",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xbd53471abf1C3827b8EeEF4898fcfe76821a3C2B",
        "0x04cc6b487566B1C821bEa04d7ac0d23CEDe05cC9",
        "0xeCB4C1245665e8A1F43826355aaB0Dd6bF336e05",
        "0xe2A45CA9Ec5780FC389FBD8991980397b8B470AF",
        "0xD4BAD65991F6362DB367e9F40e8f9CE115b83a9E",
      ].includes(connectedAddress)
    ) {
      additionalLinks.push(
        {
          label: "Crear Evento",
          href: "/create-event",
        },
        {
          label: "Agregar Quiz",
          href: "/create-quiz",
        },
        //      {
        //        label: "Debug Contracts",
        //        href: "/debug",
        //        icon: <BugAntIcon className="h-4 w-4" />,
        //      },
      );
    }
    menuLinks.push(...additionalLinks);
  }

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li className="xl:text-lg grid items-center " key={href}>
            <Link href={href} passHref className={`${isActive ? "bg-zen px-0 py-0" : ""}`}>
              <span className=" px-3 py-2 rounded-full text-white hover:bg-zen ">{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="fixed font-roo backdrop-blur-lg top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 p-0 sm:px-2 ">
      <div className="">
        <div className="lg:hidden dropdown text-zen hover:text-white" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-zen" : ""}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2  bg-gray-800  rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 shrink-0 text-xl text-center w-full pt-3">
          <div className="flex relative w-48 h-12">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal gap-2 pt-5 ">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end mr-3 w-full">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
