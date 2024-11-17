"use client";

import { useState } from "react";
import Link from "next/link";

type BookmarkButtonsProps = {
  id: string;
};

const BookmarkButtons = ({ id }: BookmarkButtonsProps) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  return (
    <div className="flex justify-center items-center gap-3 mt-3 w-full">
      <Link
        className="w-36 text-center border border-black rounded-md  bg-green-600 text-white text-xl py-1"
        href={`/edit-bookmark/${id}`}
      >
        編集
      </Link>
      <button
        onClick={() => setIsDeleteClick((prev) => !prev)}
        className="w-36 text-center border border-black rounded-md bg-red-600 text-white text-xl py-1"
      >
        削除
      </button>

      {isDeleteClick && (
        <div className="absolute left-0 top-0 w-full h-full bg-gray-700 bg-opacity-80 flex flex-col justify-center items-center gap-3">
          <p className="text-red-500 text-3xl font-bold">
            本当に削除しますか？
          </p>
          <div className="flex justify-center items-center gap-3">
            <button className="w-36 text-center border border-black rounded-md bg-red-600 text-white text-xl py-1">
              削除する
            </button>
            <button
              onClick={() => setIsDeleteClick(false)}
              className="w-36 text-center border border-black rounded-md bg-white text-xl py-1"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookmarkButtons;
