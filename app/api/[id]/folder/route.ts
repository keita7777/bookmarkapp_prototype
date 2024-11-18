import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const data = await req.json();

  try {
    const res = await prisma.folders.update({
      where: {
        id: params.id,
      },
      data: {
        user_id: data.userId,
        name: data.name,
      },
    });

    const res2 = await prisma.folder_relation.update({
      where: {
        id: params.id,
      },
      data: {
        id: res.id,
        parent_folder: data.parentFolder,
        hasChild: false,
        level: data.folderLevel,
      },
    });

    // 親フォルダがある場合、かつhasChildがfalseの場合
    if (res2.parent_folder && res2.hasChild === false) {
      // 親フォルダのhasChildをtrueに更新
      await prisma.folder_relation.update({
        where: {
          id: data.parentFolder,
        },
        data: {
          hasChild: true,
        },
      });
    }

    return NextResponse.json({ message: "更新完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "更新失敗", error }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.bookmarks.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "削除完了" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "削除失敗", error }, { status: 500 });
  }
};
