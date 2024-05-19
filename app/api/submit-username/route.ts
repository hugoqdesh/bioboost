import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Prisma.UserCreateInput;
    const newUser = await db.user.create({
      data,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("USERNAME ERROR", error);
    return new Response("An error occurred", { status: 500 });
  }
}
