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
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { userId, newEmail, newUsername } = await req.json();

  const updateData: { [key: string]: any } = {};

  if (newEmail !== undefined) {
    // Check if email is already taken
    const existingEmail = await prisma.user.findUnique({
      where: { email: newEmail },
    });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already taken" },
        { status: 400 }
      );
    }
    updateData.email = newEmail;
  }

  if (newUsername !== undefined) {
    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username: newUsername },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }
    updateData.username = newUsername;
  }

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
