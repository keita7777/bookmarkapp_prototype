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
