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
};

const CreateBookmarkForm = ({ folderData }: CreateBookmarkFormProps) => {
  const [url, setUrl] = useState("");
  const [isUrlSubmit, setIsUrlSubmit] = useState(false);
  const [urlData, setUrlData] = useState({
    title: "",
    image: "",
    url: "",
    description: "",
  });

  // クエリパラメータを取得
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("folderId");

  return (
    <div className="w-11/12 bg-white px-20 py-16 flex flex-col gap-6">
      <UrlSubmitForm
        url={url}
        setUrl={setUrl}
        setUrlData={setUrlData}
        setIsUrlSubmit={setIsUrlSubmit}
      />
      {isUrlSubmit && (
        <BookmarkSubmitForm
          url={url}
          urlData={urlData}
          folderData={folderData}
          currentFolderId={currentFolderId}
        />
      )}
    </div>
  );
};
export default CreateBookmarkForm;
