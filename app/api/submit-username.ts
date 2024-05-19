import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Prisma.UserUpdateInput;
    const id = "clwd8u2yn000caudnsshj1jni";
    const user = await db.user.update({
      data,
      where: { id },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("USERNAME ERROR", error);
    return new Response("An error occurred", { status: 500 });
  }
}
