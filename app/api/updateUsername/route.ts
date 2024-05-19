import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const { email, newUsername } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      data: {
        username: newUsername,
      },
      where: { email: email },
    });

    return NextResponse.json({
      message: "Username updated successfully",
      user: updatedUser,
    });
    // .status(200)
    // .json({ message: "Username updated successfully", user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
    // console.error(`Error updating username for user with ID ${userId}:`, error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
}
