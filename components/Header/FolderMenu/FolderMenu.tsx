import { OpenMenuProvider } from "@/context/OpenMenuContext";
import FolderTree from "./FolderTree";
import { FolderWithRelation } from "@/types/folderType";
import { useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";

type HeaderNavProps = {
  folders: FolderWithRelation[];
};

const FolderMenu = ({ folders }: HeaderNavProps) => {
  // ダミーデータなので一旦asアサーションで定義、あとで修正
  // const folderData = foldersDummyData as FoldersDummyData;

  // 個別のフォルダツリーを開く処理
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const path = usePathname();
  const folderPath = path.split("/")[1];

  return (
    <div className="w-full p-2 sm:p-0">
      <div className="bg-white rounded-md mb-4 border-2 border-black">
        <Link
          href={
            folderPath
              ? `/create-folder?folderId=${folderPath}`
              : "/create-folder"
          }
          className="px-4 py-2 font-bold flex justify-center items-center"
        >
          <FaPlus className="mr-4" />
          新規フォルダ作成
        </Link>
      </div>
      <ul className="flex flex-col gap-5">
        <FolderTree
          folders={folders}
          openFolders={openFolders}
          toggleFolder={toggleFolder}
        />
      </ul>
    </div>
  );
};
export default FolderMenu;
