import Link from "next/link";

import { IoIosArrowDown } from "react-icons/io";
import { GrBottomCorner } from "react-icons/gr";

import { Folder } from "@/types/folderType";
import { usePathname } from "next/navigation";
import FolderOpenButton from "./FolderOpenButton";
import { Dispatch, SetStateAction } from "react";
import FolderSettingButton from "./FolderSettingButton";

const FolderItem = ({
  folder,
  isSubFolderVisible,
  toggleFolder,
}: // isSubFolderVisible,
// setIsSubFolderVisible,
// folderPath,
{
  folder: Folder;
  isSubFolderVisible: boolean;
  toggleFolder: () => void;
  // isSubFolderVisible: boolean;
  // setIsSubFolderVisible: Dispatch<SetStateAction<boolean>>;
  // folderPath: number;
}) => {
  const path = usePathname();
  const folderPath = path.split("/")[1];
  const { id, name } = folder;

  return (
    <div className="flex items-center">
      {folder.folderRelations.parent_folder !== null && (
        <GrBottomCorner size={30} className="mb-2 text-white rotate-90" />
      )}
      <div
        className={` rounded h-10 flex justify-between items-center flex-1 relative ${
          folderPath === id ? "bg-blue-100" : "bg-white"
        }`}
      >
        <div className="flex items-center flex-1 h-full">
          {folder.folderRelations.hasChild && (
            <FolderOpenButton
              hasChild={folder.folderRelations.hasChild}
              isSubFolderVisible={isSubFolderVisible}
              setIsSubFolderVisible={toggleFolder}
            />
          )}

          <Link
            className={`flex-1 flex items-center h-full w-full ${
              folder.folderRelations.hasChild || "px-4"
            }`}
            href={`/${folder.id}`}
          >
            {name}
          </Link>
        </div>
        <FolderSettingButton id={id} />
      </div>
    </div>
  );
};
export default FolderItem;
