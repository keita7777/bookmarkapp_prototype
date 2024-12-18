"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FolderWithRelation } from "@/types/folderType";

type CreateFolderFormProps = {
  folderData: FolderWithRelation[];
};

const CreateFolderForm = ({ folderData }: CreateFolderFormProps) => {
  const router = useRouter();
  const path = usePathname();
  const folderPath = path.split("/")[2];

  // 個別のフォルダが選択された状態の場合、クエリパラメータを取得
  const searchParams = useSearchParams();
  const folderIdQuery = searchParams.get("folderId");

  const {
    handleSubmit,
    register,
    setError,
    // resetField,
    setValue,
    watch,
    // formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      parentFolder: "",
    },
  });

  // 編集の場合ここから
  // フォルダ名と親フォルダの初期値を設定
  const [parentFolderId, setParentFolderId] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string | null>(null);
  const getParentFolderEdit = () => {
    const result = folderData.filter((item) => item.id === folderPath);

    if (result.length <= 0) return null;

    setParentFolderId(result[0].parent_relation.parent_folder);
    setFolderName(result[0].name);
  };

  // 個別のフォルダが選択された状態の場合の新規作成
  const getParentFolderNewByFolder = () => {
    const result = folderData.filter((item) => item.id === folderIdQuery);

    if (result.length <= 0) return null;

    setParentFolderId(result[0].parent_relation.parent_folder);
  };

  useEffect(() => {
    if (folderPath) {
      getParentFolderEdit();
    } else if (folderIdQuery) {
      getParentFolderNewByFolder();
    }
  }, []);

  useEffect(() => {
    // 編集の場合
    if (folderPath) {
      if (parentFolderId !== null) {
        setValue("parentFolder", parentFolderId);
      }
      if (folderName !== null) {
        setValue("name", folderName);
      }
    }

    // 個別のフォルダが選択された状態の場合の新規作成
    if (folderIdQuery) {
      if (folderIdQuery !== null) {
        setValue("parentFolder", folderIdQuery);
      }
    }
  }, [parentFolderId, folderName, setValue]);
  // 編集の場合ここまで

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
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders`, {
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

  const updateFolder = async (
    name: string,
    // userId: string,
    parentFolder: string | null,
    folderLevel: "ONE" | "TWO" | "THREE"
  ) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${folderPath}/folder`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
          parentFolder,
          folderLevel,
        }),
      }
    );
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };

  const onSubmit = (data: FieldValues) => {
    const { name, parentFolder } = data;
    const formattedParentFolder = parentFolder === "" ? null : parentFolder;

    if (folderPath) {
      updateFolder(name, formattedParentFolder, folderLevel);
    } else {
      createFolder(name, formattedParentFolder, folderLevel);
    }

    router.push("/");
    router.refresh();
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
          // defaultValue="75f2efe8-e3c2-441a-9190-27c94d740f47"
          {...register("parentFolder")}
        >
          <option value="">指定しない</option>
          {folderData &&
            folderData
              .filter(
                (folder) =>
                  // 第3階層のフォルダ以下には作成できない
                  folder.parent_relation.level !== "THREE" &&
                  // 編集の場合、自身のフォルダは選択肢から除外
                  folder.id !== folderPath
              )
              .map((folder) => (
                <option key={folder.id} value={folder.id}>
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
          {folderPath ? "更新" : "作成"}
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
