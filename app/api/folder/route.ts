import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const folders = await prisma.folders.findMany({
      include: {
        parent_relation: true,
      },
    });

    return NextResponse.json({ message: "取得完了", folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    // foldersテーブルにデータ挿入
    const res = await prisma.folders.create({
      data: {
        user_id: data.userId,
        name: data.name,
      },
    });

    // folder_relationテーブルにデータ挿入
    const res2 = await prisma.folder_relation.create({
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

    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};
