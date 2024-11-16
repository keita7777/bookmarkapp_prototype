"use client";

import { FaFolder, FaSearch, FaRegUserCircle } from "react-icons/fa";
import FolderMenu from "./FolderMenu/FolderMenu";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import SearchMenu from "./SearchMenu/SearchMenu";
import { useEffect, useState } from "react";
import { FolderWithRelation } from "@/types/folderType";

type HeaderNavProps = {
  folders: FolderWithRelation[];
};

const HeaderNav = ({ folders }: HeaderNavProps) => {
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
        {openHeaderMenu === "folder" && <FolderMenu folders={folders} />}
        {openHeaderMenu === "search" && <SearchMenu />}
        {openHeaderMenu === "profile" && <ProfileMenu />}
      </div>
    </div>
  );
};
export default HeaderNav;
