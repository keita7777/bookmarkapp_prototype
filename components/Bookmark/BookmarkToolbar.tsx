import Link from "next/link";
import { FaPlus } from "react-icons/fa";

type BookmarkToolbarProps = {
  folderId?: string;
};

const BookmarkToolbar = ({ folderId }: BookmarkToolbarProps) => {
  return (
    <div className="mb-5 flex flex-col xl:flex-row justify-between">
      <div>
        <Link
          href={
            folderId
              ? `/create-bookmark?folderId=${folderId}`
              : "/create-bookmark"
          }
          className="flex justify-between items-center gap-2 w-72 bg-gray-500 text-white px-8 py-2 rounded-md text-xl"
        >
          <span>ブックマーク作成</span>
          <FaPlus />
        </Link>
      </div>
      <div className="flex gap-4">
        <select
          name=""
          id=""
          className="border border-black rounded-md text-xl px-4 py-2"
        >
          <option value="">5件表示</option>
          <option value="">10件表示</option>
          <option value="">全て表示</option>
        </select>
        <select
          name=""
          id=""
          className="border border-black rounded-md text-xl px-4 py-2"
        >
          <option value="">並び替え</option>
          <option value="">アクセス数降順</option>
          <option value="">アクセス数昇順</option>
        </select>
      </div>
    </div>
  );
};
export default BookmarkToolbar;
