import { bookmarkDummyData } from "@/DummyData/bookmarkData";
import BoomarkCard from "./BoomarkCard";

import { Bookmarks } from "@prisma/client";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type BookmarkListProps = {
  folderId?: string;
};

const BookmarkList = async ({ folderId }: BookmarkListProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark${
      folderId ? `?folderId=${folderId}` : ""
    }`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await res.json();
  const bookmarks: BookmarkWithMemo[] = data.bookmarks;

  return (
    <div className="">
      <ul className="flex flex-col gap-4">
        {bookmarks.map((bookmark) => (
          <BoomarkCard
            key={bookmark.id}
            bookmark={bookmark}
            folderId={folderId}
          />
        ))}
      </ul>
    </div>
  );
};
export default BookmarkList;
