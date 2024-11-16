import { Folder, FolderWithRelation } from "@/types/folderType";
import FolderItem from "./FolderItem";

const FolderTree = ({
  folders,
  parentId = null,
  openFolders,
  toggleFolder,
}: {
  folders: FolderWithRelation[];
  parentId?: string | null;
  openFolders: Record<string, boolean>;
  toggleFolder: (folderId: string) => void;
}) => {
  return folders
    .filter((folder) => folder.parent_relation.parent_folder === parentId)
    .map((folder) => (
      <li key={folder.id} className="flex flex-col gap-5">
        <FolderItem
          folder={folder}
          isSubFolderVisible={!!openFolders[folder.id]}
          toggleFolder={() => toggleFolder(folder.id)}
        />
        {folder.parent_relation.hasChild && openFolders[folder.id] && (
          <ul className="ml-6 flex flex-col gap-5">
            <FolderTree
              folders={folders}
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
