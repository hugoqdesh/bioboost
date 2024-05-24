import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
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

export async function PUT(req: Request) {
  const { userId, newEmail } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });

    return NextResponse.json({
      message: "Email updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
