import { bookmarkDummyData } from "@/DummyData/bookmarkData";
import BoomarkCard from "./BoomarkCard";

import { Bookmarks } from "@prisma/client";

type BookmarkListProps = {
  folderId?: number;
};

const BookmarkList = async ({ folderId }: BookmarkListProps) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`, {
  //   method: "GET",
  //   cache: "no-store",
  // });

  // const data = await res.json();
  // const bookmarks = data.bookmarks;

  return (
    <div className="">
      <ul className="flex flex-col gap-4">
        {bookmarkDummyData.map((bookmark) => (
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
