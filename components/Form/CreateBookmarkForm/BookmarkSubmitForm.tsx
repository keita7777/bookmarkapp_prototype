import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import testImage from "@/DummyData/images/test-image.png";
import { FolderWithRelation } from "@/types/folderType";
import { useRouter, useSearchParams } from "next/navigation";
import { BookmarkWithMemo } from "@/types/bookmarkType";

type BookmarkSubmitFormProps = {
  urlData?: {
    title: string;
    image: string;
    url: string;
    description: string;
  };
  folderData: FolderWithRelation[];
  url: string;
  bookmarkData: BookmarkWithMemo;
};

const BookmarkSubmitForm = ({
  urlData,
  folderData,
  url,
  bookmarkData,
}: BookmarkSubmitFormProps) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [folder_level1, setFolder_level1] = useState<string | null>(null);
  const [folder_level2, setFolder_level2] = useState<string | null>(null);
  const [folder_level3, setFolder_level3] = useState<string | null>(null);
  const [folderErrorMessage, setFolderErrorMessage] = useState<string | null>(
    null
  );

  const [folder_level1_defaultValue, setFolder_level1_defaultValue] = useState<
    string | null
  >(null);
  const [folder_level2_defaultValue, setFolder_level2_defaultValue] = useState<
    string | null
  >(null);
  const [folder_level3_defaultValue, setFolder_level3_defaultValue] = useState<
    string | null
  >(null);

  // クエリパラメータを取得
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("folderId");

  // console.log("レベル1：" + folder_level1_defaultValue);
  // console.log("レベル2：" + folder_level2_defaultValue);
  // console.log("レベル3：" + folder_level3_defaultValue);

  if (bookmarkData) {
    // 編集の場合
    useEffect(() => {
      const data = folderData.filter(
        (item) => item.id === bookmarkData.folder_id
      );

      // 対象データが見つからない場合準備完了にする
      if (!data) {
        setIsReady(true);
        return;
      }

      const currentFolderData = data[0];

      console.log(currentFolderData.parent_relation.level);

      if (currentFolderData.parent_relation.level === "THREE") {
        const folder3 = currentFolderData.id;
        const folder2 = currentFolderData.parent_relation.parent_folder;
        const folder1Data = folderData.filter(
          (item) => item.parent_relation.id === folder2
        );
        const folder1 = folder1Data[0].parent_relation.parent_folder;

        // console.log("レベル3：" + folder3);
        // console.log("レベル2：" + folder2);
        // console.log("レベル1：" + folder1);

        setFolder_level3_defaultValue(folder3);
        setFolder_level2_defaultValue(folder2);
        setFolder_level1_defaultValue(folder1);

        setFolder_level3(folder3);
        setFolder_level2(folder2);
        setFolder_level1(folder1);
      } else if (currentFolderData.parent_relation.level === "TWO") {
        const folder2 = currentFolderData.id;
        const folder1 = currentFolderData.parent_relation.id;
        setFolder_level2_defaultValue(folder2);
        setFolder_level1_defaultValue(folder1);

        setFolder_level2(folder2);
        setFolder_level1(folder1);
      } else {
        const folder1 = currentFolderData.id;
        setFolder_level1_defaultValue(folder1);

        setFolder_level1(folder1);
      }

      setIsReady(true);
    }, []);
  } else {
    // 新規作成の場合
    useEffect(() => {
      // クエリパラメータがない場合準備完了にする
      if (!currentFolderId) {
        setIsReady(true);
        return;
      }

      const data = folderData.filter((item) => item.id === currentFolderId);
      // 対象データが見つからない場合準備完了にする
      if (!data) {
        setIsReady(true);
        return;
      }
      const currentFolderData = data[0];

      if (currentFolderData.parent_relation.level === "THREE") {
        // console.log("レベル3のフォルダ");

        const folder3 = currentFolderData.id;
        const folder2 = currentFolderData.parent_relation.parent_folder;
        const folder1Data = folderData.filter(
          (item) => item.parent_relation.id === folder2
        );
        const folder1 = folder1Data[0].parent_relation.parent_folder;

        // console.log("レベル3：" + folder3);
        // console.log("レベル2：" + folder2);
        // console.log("レベル1：" + folder1);

        setFolder_level3_defaultValue(folder3);
        setFolder_level2_defaultValue(folder2);
        setFolder_level1_defaultValue(folder1);

        setFolder_level3(folder3);
        setFolder_level2(folder2);
        setFolder_level1(folder1);
      } else if (currentFolderData.parent_relation.level === "TWO") {
        // console.log("レベル2のフォルダ");
        const folder2 = currentFolderData.id;
        const folder1 = currentFolderData.parent_relation.id;
        setFolder_level2_defaultValue(folder2);
        setFolder_level1_defaultValue(folder1);

        setFolder_level2(folder2);
        setFolder_level1(folder1);
      } else {
        // console.log("レベル1のフォルダ");
        const folder1 = currentFolderData.id;
        setFolder_level1_defaultValue(folder1);

        setFolder_level1(folder1);
      }
      setIsReady(true);
    }, []);
  }

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (folder_level3) {
      setValue("selectedFolder", folder_level3);
    } else if (folder_level2) {
      setValue("selectedFolder", folder_level2);
    } else if (folder_level1) {
      setValue("selectedFolder", folder_level1);
    } else {
      setValue("selectedFolder", null);
    }
  }, [folder_level1, folder_level2, folder_level3, setValue]);

  const handleCancel = (e: any) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };

  const createBookmark = async (
    url: string,
    title: string,
    description: string,
    folder_id: string,
    image: string | null | undefined,
    memo: string | null
  ) => {
    const response = await fetch(`http://localhost:3000/api/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
        folder_id,
        url,
        title,
        description,
        image,
        memo,
      }),
    });
  };

  const updateBookmark = async (
    url: string,
    title: string,
    description: string,
    folder_id: string,
    image: string | null | undefined,
    memo: string | null
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${bookmarkData.id}/bookmark`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
          folder_id,
          url,
          title,
          description,
          image,
          memo,
        }),
      }
    );
  };

  const onSubmit = (data: FieldValues) => {
    if (!folder_level1) {
      setError("root", {
        message: "フォルダを選択してください",
      });
      return;
    }
    setFolderErrorMessage(null);

    const { title, description, selectedFolder, memo } = data;

    if (bookmarkData) {
      updateBookmark(
        url,
        title,
        description,
        selectedFolder,
        urlData?.image,
        memo
      );
    } else {
      createBookmark(
        url,
        title,
        description,
        selectedFolder,
        urlData?.image,
        memo
      );
    }
  };

  // ローディング中の表示 必要か？
  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white flex flex-col gap-6"
    >
      {errors.root && (
        <p className="text-red-500 text-lg font-bold">{errors.root.message}</p>
      )}
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
            defaultValue={bookmarkData?.title || urlData?.title || ""}
            {...register("title")}
          />
          <label htmlFor="" className="text-xl font-bold">
            詳細
          </label>
          <textarea
            rows={5}
            className="border border-black rounded-md p-2"
            defaultValue={
              bookmarkData?.description || urlData?.description || ""
            }
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
            onChange={(e) => {
              setFolder_level1(e.target.value);
              setFolder_level2(null);
              setFolder_level3(null);
            }}
            defaultValue={
              folder_level1_defaultValue ? folder_level1_defaultValue : ""
            }
          >
            <option value="" disabled>
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
        {folder_level1 || folder_level2_defaultValue ? (
          <div className="flex flex-col gap-2 w-1/3">
            <label htmlFor="" className="text-xl font-bold">
              第2階層
            </label>
            <select
              name=""
              id=""
              className="border border-black rounded-md p-2"
              onChange={(e) => {
                setFolder_level2(e.target.value);
                setFolder_level3(null);
              }}
              defaultValue={
                folder_level2_defaultValue ? folder_level2_defaultValue : ""
              }
            >
              <option disabled value="">
                フォルダを選択してください
              </option>
              <option value="">設定しない</option>
              {folderData
                .filter(
                  (item) => item.parent_relation.parent_folder === folder_level1
                )
                .map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
            </select>
          </div>
        ) : null}
        {folder_level2 && (
          <div className="flex flex-col gap-2 w-1/3">
            <label htmlFor="" className="text-xl font-bold">
              第3階層
            </label>
            <select
              name=""
              id=""
              className="border border-black rounded-md p-2"
              onChange={(e) => setFolder_level3(e.target.value)}
              defaultValue={
                folder_level3_defaultValue ? folder_level3_defaultValue : ""
              }
            >
              <option disabled value="">
                フォルダを選択してください
              </option>
              <option value="">設定しない</option>
              {folderData
                .filter(
                  (item) => item.parent_relation.parent_folder === folder_level2
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
        <textarea
          rows={5}
          className="border border-black rounded-md p-2"
          defaultValue={bookmarkData?.memo?.memo || ""}
          {...register("memo")}
        />
      </div>
      <div className="flex gap-6 justify-center items-center">
        <button className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1">
          {bookmarkData ? "更新" : "作成"}
        </button>
        <button
          onClick={handleCancel}
          className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};
export default BookmarkSubmitForm;
