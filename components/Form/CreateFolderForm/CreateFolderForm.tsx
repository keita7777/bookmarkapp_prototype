"use client";

import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Folder, FolderWithRelation } from "@/types/folderType";
import { foldersDummyData } from "@/DummyData/folderData";

type CreateFolderFormProps = {
  folderData: FolderWithRelation[];
};

const CreateFolderForm = ({ folderData }: CreateFolderFormProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    resetField,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({});

  const [folderLevel, setFolderLevel] = useState<"ONE" | "TWO" | "THREE">(
    "ONE"
  );
  const currentParentFolderValues = watch("parentFolder");

  useEffect(() => {
    const defineFolderLevel = () => {
      const data = folderData.filter(
        (folder) => folder.id === currentParentFolderValues
      );
      if (data[0]?.parent_relation.level === "ONE") {
        setFolderLevel("TWO");
      } else if (data[0]?.parent_relation.level === "TWO") {
        setFolderLevel("THREE");
      } else {
        setError("root", {
          message: "このフォルダ以下には作成できません",
        });
      }
    };
    if (currentParentFolderValues === "") {
      setFolderLevel("ONE");
    } else {
      defineFolderLevel();
    }
  }, [currentParentFolderValues]);

  const createFolder = async (
    name: string,
    // userId: string,
    parentFolder: string | null,
    folderLevel: "ONE" | "TWO" | "THREE"
  ) => {
    const response = await fetch(`http://localhost:3000/api/folder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
        parentFolder,
        folderLevel,
      }),
    });
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };
  const onSubmit = (data: FieldValues) => {
    const { name, parentFolder } = data;
    const formattedParentFolder = parentFolder === "" ? null : parentFolder;

    createFolder(name, formattedParentFolder, folderLevel);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white px-20 py-16 flex flex-col gap-6"
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
          <option value="">指定しない</option>
          {folderData &&
            folderData
              .filter((folder) => folder.parent_relation.level !== "THREE")
              .map((folder) => (
                <option key={folder.id} value={folder.id.toString()}>
                  {folder.name}
                </option>
              ))}
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
