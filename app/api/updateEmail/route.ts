import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const { currentEmail, newEmail } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      data: {
        email: newEmail,
      },
      where: { email: currentEmail },
    });

    return NextResponse.json({
      message: "Email updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
