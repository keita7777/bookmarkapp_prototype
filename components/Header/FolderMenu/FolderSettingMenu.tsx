import Link from "next/link";

type FolderSettingMenuProps = {
  id: string | null;
};

const FolderSettingMenu = ({ id }: FolderSettingMenuProps) => {
  return (
    <div className="absolute -right-44 top-0 z-10 bg-gray-200 px-4 py-3 rounded-xl">
      <ul>
        <li className="mb-2">
          <Link
            href={`/edit-folder/${id}`}
            className="bg-white rounded-md px-4 py-2 block"
          >
            フォルダ編集
          </Link>
        </li>
        <li>
          <button className="bg-white rounded-md px-4 py-2">
            フォルダ削除
          </button>
        </li>
      </ul>
    </div>
  );
};
export default FolderSettingMenu;
