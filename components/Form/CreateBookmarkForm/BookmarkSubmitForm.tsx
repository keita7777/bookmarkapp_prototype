import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import testImage from "@/DummyData/images/test-image.png";
import { FolderWithRelation } from "@/types/folderType";
import { useRouter } from "next/navigation";

type BookmarkSubmitFormProps = {
  urlData?: {
    title: string;
    image: string;
    url: string;
    description: string;
  };
  folderData: FolderWithRelation[];
};

const BookmarkSubmitForm = ({
  urlData,
  folderData,
}: BookmarkSubmitFormProps) => {
  const router = useRouter();
  const [folder_level1, setFolder_level1] = useState<string | null>(null);
  const [folder_level2, setFolder_level2] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCancel = (e: any) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };

  const onSubmit = () => {};

  return (
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
            <option disabled selected>
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
              <option disabled selected>
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
              <option disabled selected>
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
  );
};
export default BookmarkSubmitForm;
