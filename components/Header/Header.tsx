"use client";

import { FaFolder, FaSearch, FaRegUserCircle } from "react-icons/fa";
import FolderMenu from "./FolderMenu/FolderMenu";
import SearchMenu from "../SearchMenu/SearchMenu";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Header = () => {
  const [openHeaderMenu, setOpenHeaderMenu] = useState("folder");
  const [isMobile, setIsMobile] = useState(false);

  // スマホ表示であるかを判定、contextで定義した方がよいか？
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleClick = (id: string) => {
    if (isMobile && openHeaderMenu === id) {
      // クリックしたメニューが既に開いている場合は閉じる
      setOpenHeaderMenu("");
    } else {
      setOpenHeaderMenu(id);
    }
  };

  return (
    <header className="shrink-0 sm:h-screen min-w-[500px] bg-gray-500 flex sm:flex-col relative w-full sm:w-auto justify-between">
      <h1 className="text-3xl px-4 py-4 text-white font-bold flex justify-center items-center">
        ブックマーク管理
      </h1>
      <div className="h-full flex p-4 sm:pt-0">
        <div className="text-4xl pr-4 sm:border-r-2 border-white">
          <nav>
            <ul className="flex sm:flex-col gap-5 ">
              <li
                className={` rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                  openHeaderMenu === "folder"
                    ? "bg-slate-100 text-gray-500"
                    : "text-white"
                }`}
              >
                <button onClick={() => handleClick("folder")} className="p-2">
                  <FaFolder />
                </button>
              </li>
              <li
                className={`rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                  openHeaderMenu === "search"
                    ? "bg-slate-100 text-gray-500"
                    : "text-white"
                }`}
              >
                <button onClick={() => handleClick("search")} className="p-2">
                  <FaSearch />
                </button>
              </li>
              <li
                className={`rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                  openHeaderMenu === "profile"
                    ? "bg-slate-100 text-gray-500"
                    : "text-white"
                }`}
              >
                <button onClick={() => handleClick("profile")} className="p-2">
                  <FaRegUserCircle />
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-full sm:ml-4 absolute sm:static left-0 top-full bg-gray-300 sm:bg-transparent">
          {openHeaderMenu === "folder" && <FolderMenu />}
          {openHeaderMenu === "search" && <SearchMenu />}
          {openHeaderMenu === "profile" && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
};
export default Header;
