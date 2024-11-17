"use client";

// import { folderData } from "@/DummyData/folderData";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { Folders } from "@prisma/client";
import { FolderWithRelation } from "@/types/folderType";
import UrlSubmitForm from "./UrlSubmitForm";
import BookmarkSubmitForm from "./BookmarkSubmitForm";

type CreateBookmarkFormProps = {
  folderData: FolderWithRelation[];
  bookmarkId?: string;
};

const CreateBookmarkForm = ({
  folderData,
  bookmarkId,
}: CreateBookmarkFormProps) => {
  const [url, setUrl] = useState("");
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
      {isUrlSubmit && (
        <BookmarkSubmitForm
          key={bookmarkKey}
          url={url}
          urlData={urlData}
          folderData={folderData}
        />
      )}
    </div>
  );
};
export default CreateBookmarkForm;
