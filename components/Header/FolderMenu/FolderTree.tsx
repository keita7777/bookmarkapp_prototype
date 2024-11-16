import { Folder } from "@/types/folderType";
import FolderItem from "./FolderItem";

const FolderTree = ({
  foldersDummyData,
  parentId = null,
  openFolders,
  toggleFolder,
}: {
  foldersDummyData: Folder[];
  parentId?: string | null;
  openFolders: Record<string, boolean>;
  toggleFolder: (folderId: string) => void;
}) => {
  return foldersDummyData
    .filter((folder) => folder.folderRelations.parent_folder === parentId)
    .map((folder) => (
      <li key={folder.id} className="flex flex-col gap-5">
        <FolderItem
          folder={folder}
          isSubFolderVisible={!!openFolders[folder.id]}
          toggleFolder={() => toggleFolder(folder.id)}
        />
        {folder.folderRelations.hasChild && openFolders[folder.id] && (
          <ul className="ml-6 flex flex-col gap-5">
            <FolderTree
              foldersDummyData={foldersDummyData}
              parentId={folder.id}
              openFolders={openFolders}
              toggleFolder={toggleFolder}
            />
          </ul>
        )}
      </li>
    ));
};

export default FolderTree;
