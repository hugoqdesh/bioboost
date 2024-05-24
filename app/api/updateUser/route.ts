import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { userId, newName, newImage, newBio, newBackgroundImage } =
    await req.json();

  const updateData: { [key: string]: any } = {};

  if (newName !== undefined) updateData.name = newName;
  if (newImage !== undefined) updateData.image = newImage;
  if (newBio !== undefined) updateData.bio = newBio;
  if (newBackgroundImage !== undefined)
    updateData.backgroundImage = newBackgroundImage;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      data: updateData,
      where: { id: userId },
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
