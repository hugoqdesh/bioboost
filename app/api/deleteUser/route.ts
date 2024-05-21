import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: Response) {
  const { userId } = await req.json();

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
