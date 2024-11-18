import Image from "next/image";
import testImage from "@/DummyData/images/test-image.png";
import { BookmarkWithMemo } from "@/types/bookmarkType";
import BookmarkButtons from "./BookmarkButtons";
import BoomarkSettingButton from "./BoomarkSettingButton";

type BoomarkCardProps = {
  bookmark: BookmarkWithMemo;
  folderId?: string;
};

const BoomarkCard = ({ bookmark }: BoomarkCardProps) => {
  return (
    <li className="flex flex-col border border-black rounded-md p-3 relative">
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
            <BoomarkSettingButton id={bookmark.id} />
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

      <BookmarkButtons id={bookmark.id} />
    </li>
  );
};
export default BoomarkCard;
