import { Bookmark_memo, Bookmarks } from "@prisma/client";

export type BookmarkWithMemo = Bookmarks & { memo: Bookmark_memo };

export type bookmarkType = {
  id: string;
  title: string;
  url: string;
  description: string;
  memo: string;
  folder_id: string;
  image?: string;
};
