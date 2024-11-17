import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const bookmark = await prisma.bookmarks.findUnique({
      where: {
        id: params.id,
      },
      include: {
        memo: true,
      },
    });

    return NextResponse.json(
      { message: "取得完了", bookmark },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const data = await req.json();

  try {
    await prisma.bookmarks.update({
      where: {
        id: params.id,
      },
      data: {
        user_id: data.userId,
        folder_id: data.folder_id,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });

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
