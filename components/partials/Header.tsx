import React from "react";
import Image from "next/image";
import Logo from "/public/Logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
const LIST_MENU = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Movie",
    path: "/about",
  },
  {
    name: "Tv Show",
    path: "/tvshow",
  },
];
const Header: React.FC = () => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <div className="p-2 bg-primary">
      <div className="container flex items-center gap-x-10">
        <Image
          className="w-10 h-10 select-none"
          src={Logo}
          alt="logo"
          priority
        ></Image>
        <ul className="flex gap-x-3">
          {LIST_MENU.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`${
                  pathName === item.path ? "text-active" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
