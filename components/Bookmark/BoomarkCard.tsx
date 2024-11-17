import Image from "next/image";
import testImage from "@/DummyData/images/test-image.png";
import Link from "next/link";
import { bookmarkType, BookmarkWithMemo } from "@/types/bookmarkType";

type BoomarkCardProps = {
  bookmark: BookmarkWithMemo;
  folderId?: string;
};

const BoomarkCard = ({ bookmark, folderId }: BoomarkCardProps) => {
  return (
    <li className="flex flex-col border border-black rounded-md p-3">
      <div className="flex flex-col lg:flex-row">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full lg:w-[300px] h-[300px] lg:h-[200px]"
        >
          <Image src={bookmark.image || testImage} fill alt="画像" />
        </a>
        <div className="flex flex-col gap-2 w-full lg:ml-5">
          <div className="flex justify-between relative">
            <h2 className="text-xl font-bold">{bookmark.title}</h2>
            {/* <BoomarkSettingButton id={bookmark.id} /> */}
          </div>

          <p className="text-gray-600">{bookmark.description}</p>
          <div className="bg-gray-600 rounded-md p-3">
            <h3 className="text-white">メモ</h3>
            <p className="bg-white mt-2 p-2 rounded-md">
              {/* {bookmark.memo} */}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 mt-3 w-full">
        <Link
          className="w-24 text-center border border-black rounded-md"
          href={`/edit-bookmark/${bookmark.id}`}
        >
          編集
        </Link>
        <button className="w-24 text-center border border-black rounded-md">
          削除
        </button>
      </div>
    </li>
  );
};
export default BoomarkCard;
