"use client";

// import { folderData } from "@/DummyData/folderData";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IoSend } from "react-icons/io5";
import testImage from "@/DummyData/images/test-image.png";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { Folders } from "@prisma/client";
import { FolderWithRelation } from "@/types/folderType";

const getUrlInfo = async (url: string) => {
  const data = { q: url };
  try {
    const response = await fetch("https://api.linkpreview.net", {
      method: "POST",
      headers: {
        "X-Linkpreview-Api-Key": "24bb1eef6ac6094124990416b962c129",
      },
      mode: "cors",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return { message: "エラーが発生しました" };
    }
    return response.json();
  } catch (error) {
    return { message: "エラーが発生しました", error };
  }
};

type CreateBookmarkFormProps = {
  folderData: FolderWithRelation[];
};

const CreateBookmarkForm = ({ folderData }: CreateBookmarkFormProps) => {
  const [folder_level1, setFolder_level1] = useState<string | null>(null);
  const [folder_level2, setFolder_level2] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState({
    title: "",
    image: "",
    url: "",
    description: "",
  });
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  // クエリパラメータを取得
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("folderId");

  const handleLevel1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);

    setFolder_level1(e.target.value);
    // const result = folderData.filter(
    //   (item) => item.parent_relation.parent_folder === e.target.value
    // );
    // if (result.length > 0) {
    //   setFolder_level2(result[0].id);
    // }
  };
  const handleLevel2Change = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);

    setFolder_level2(e.target.value);
    const result = folderData.filter(
      (item) => item.parent_relation.parent_folder === e.target.value
    );
    console.log(result);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };

  // URLからサイトのデータを取得
  const handleUrlSubmit = async (e: any) => {
    e.preventDefault();

    if (url) {
      const data = await getUrlInfo(url);
      setUrlData(data);
    }
  };

  const onSubmit = () => {};

  return (
    <div className="w-11/12 bg-white px-20 py-16 flex flex-col gap-6">
      <form onSubmit={handleUrlSubmit} className="bg-white flex gap-4">
        <input
          type="text"
          className="border border-black rounded-md p-2 flex-1"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="bg-gray-400 px-4 rounded-md">
          <IoSend />
        </button>
      </form>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-6"
      >
        <div className="flex justify-center items-center gap-4">
          <div className="relative w-[400px] h-[250px]">
            <Image src={urlData?.image || testImage} fill alt="画像" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="" className="text-xl font-bold">
              タイトル
            </label>
            <input
              type="text"
              className="border border-black rounded-md p-2"
              defaultValue={urlData?.title || ""}
              {...register("title")}
            />
            <label htmlFor="" className="text-xl font-bold">
              詳細
            </label>
            <textarea
              rows={5}
              className="border border-black rounded-md p-2"
              defaultValue={urlData?.description || ""}
              {...register("description")}
            />
          </div>
        </div>
        <div className="flex gap-4 p-6 border border-black rounded-md">
          <div className="flex flex-col gap-2 w-1/3">
            <label htmlFor="" className="text-xl font-bold">
              第1階層
            </label>
            <select
              name=""
              id=""
              className="border border-black rounded-md p-2"
              onChange={(e) => setFolder_level1(e.target.value)}
            >
              <option value="" disabled selected>
                フォルダを選択してください
              </option>
              {folderData
                .filter((item) => item.parent_relation.level === "ONE")
                .map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>
          </div>
          {folder_level1 && (
            <div className="flex flex-col gap-2 w-1/3">
              <label htmlFor="" className="text-xl font-bold">
                第2階層
              </label>
              <select
                name=""
                id=""
                className="border border-black rounded-md p-2"
                onChange={(e) => setFolder_level2(e.target.value)}
              >
                <option value="" disabled selected>
                  フォルダを選択してください
                </option>
                {folderData
                  .filter(
                    (item) =>
                      item.parent_relation.parent_folder === folder_level1
                  )
                  .map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {folder_level2 && (
            <div className="flex flex-col gap-2 w-1/3">
              <label htmlFor="" className="text-xl font-bold">
                第3階層
              </label>
              <select
                name=""
                id=""
                className="border border-black rounded-md p-2"
              >
                <option value="" disabled selected>
                  フォルダを選択してください
                </option>
                {folderData
                  .filter(
                    (item) =>
                      item.parent_relation.parent_folder === folder_level2
                  )
                  .map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl font-bold">
            メモ
          </label>
          <textarea rows={5} className="border border-black rounded-md p-2" />
        </div>
        <div className="flex gap-6 justify-center items-center">
          <button className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1">
            作成
          </button>
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBookmarkForm;
