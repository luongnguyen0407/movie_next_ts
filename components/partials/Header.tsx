import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "/public/Logo.png";
import Link from "next/link";
import _debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

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
  const [isTop, setIsTop] = useState(true);
  const router = useRouter();
  const pathName = router.pathname;
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    document.addEventListener("scroll", _debounce(handleScroll, 500));
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`fixed z-50 w-full p-2 transition duration-500 ${
        !isTop
          ? "bg-primary"
          : "bg-gradient-to-b from-black/80 via-black/60 to-transparent"
      } `}
    >
      <div className="container flex items-center gap-x-10">
        <Image
          className="w-10 h-10 select-none"
          src={Logo}
          alt="logo"
          priority
        ></Image>
        <ul className="flex gap-x-3">
          {LIST_MENU.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Link
                href={item.path}
                className={`${
                  pathName === item.path ? "text-active" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
