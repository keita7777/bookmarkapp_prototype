"use client";

import { useState } from "react";
import { FolderWithRelation } from "@/types/folderType";
import UrlSubmitForm from "./UrlSubmitForm";
import BookmarkSubmitForm from "./BookmarkSubmitForm";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type CreateBookmarkFormProps = {
  folderData: FolderWithRelation[];
  bookmarkId?: string;
  bookmarkData?: BookmarkWithMemo;
};

const CreateBookmarkForm = ({
  folderData,
  // bookmarkId,
  bookmarkData,
}: CreateBookmarkFormProps) => {
  // 編集の場合は初期値にブックマークのURLを設定
  const [url, setUrl] = useState(bookmarkData?.url || "");
  const [isUrlSubmit, setIsUrlSubmit] = useState(false);
  const [urlData, setUrlData] = useState({
    title: "",
    image: "",
    url: "",
    description: "",
  });

  // URLを入力しなおした時の対策
  const [bookmarkKey, setBookmarkKey] = useState(0);

  const handleUrlSubmit = (newUrlData: typeof urlData) => {
    setUrlData(newUrlData);
    setIsUrlSubmit(true);
    setBookmarkKey((prev) => prev + 1);
  };

  return (
    <div className="w-11/12 bg-white px-20 py-16 flex flex-col gap-6">
      <UrlSubmitForm
        url={url}
        setUrl={setUrl}
        setUrlData={handleUrlSubmit}
        setIsUrlSubmit={setIsUrlSubmit}
      />
      {(isUrlSubmit || bookmarkData) && (
        <BookmarkSubmitForm
          key={bookmarkKey}
          url={url}
          urlData={urlData}
          folderData={folderData}
          bookmarkData={bookmarkData}
        />
      )}
    </div>
  );
};
export default CreateBookmarkForm;
