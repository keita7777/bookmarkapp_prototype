import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const folderId = params.id;

  try {
    let subFolderArray1: Array<string> = [];
    let subFolderArray2: Array<string> = [];
    let resultArray: Array<string> = [];

    if (folderId) {
      // パスパラメータのfolderIdをparent_folderとして持つ子フォルダを取得
      const res = await prisma.folder_relation.findMany({
        where: {
          parent_folder: folderId,
        },
      });

      // 取得したフォルダデータのidを重複を削除して配列に格納
      subFolderArray1 = Array.from(new Set(res.map((item) => item.id)));

      const res2 = await prisma.folder_relation.findMany({
        where: {
          parent_folder: {
            in: subFolderArray1,
          },
        },
      });

      subFolderArray2 = Array.from(new Set(res2.map((item) => item.id)));

      resultArray = Array.from(
        new Set([...subFolderArray1, ...subFolderArray2])
      );

      resultArray.push(folderId);
    }

    const bookmarks = await prisma.bookmarks.findMany({
      where: {
        folder_id: {
          in: folderId ? resultArray : undefined,
        },
      },
      include: {
        memo: true,
      },
    });

    return NextResponse.json(
      {
        message: "取得完了",
        bookmarks,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    // bookmarksテーブルにデータ挿入
    await prisma.bookmarks.create({
      data: {
        user_id: data.userId,
        folder_id: data.folder_id,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });

    // bookmark_memoテーブルにデータ挿入
    // const res2 = await prisma.bookmark_memo.create({
    //   data: {
    //     id: res.id,
    //     memo: data.memo,
    //   },
    // });

    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};
