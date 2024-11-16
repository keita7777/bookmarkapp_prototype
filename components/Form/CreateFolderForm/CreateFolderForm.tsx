"use client";

// import { folderData } from "@/DummyData/folderData";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Folder } from "@/types/folderType";

type CreateFolderFormProps = {
  folderData: Folder[];
  currentFolderId?: string;
};

type createFolderFormData = {
  name: string;
  folder: string;
};

const CreateFolderForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    resetField,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({});

  const handleCancel = (e: any) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };
  const onSubmit = (data: FieldValues) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-2/3 bg-white px-20 py-16 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl font-bold">
          フォルダ名
        </label>
        <input
          type="text"
          className="border border-black rounded-md p-2"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="folder" className="text-xl font-bold">
          親フォルダを選択
        </label>
        <select
          className="border border-black rounded-md p-2"
          {...register("parentFolder")}
        >
          <option value="ONE">指定しない</option>
          {/* {folderData &&
              folderData
                // .filter((folder) => folder.parent_relation.level !== "THREE")
                .map((folder) => (
                  <option key={folder.id} value={folder.id.toString()}>
                    {folder.name}
                  </option>
                ))} */}
        </select>
      </div>
      <div className="flex gap-6 justify-center items-center">
        <button
          type="submit"
          className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1"
        >
          作成
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};
export default CreateFolderForm;
