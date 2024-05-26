import { PrismaClient } from "@prisma/client";
import ProfileClientComponent from "@/components/dashboard/ProfileClientComponent";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    select: {
      name: true,
      backgroundImage: true,
      bio: true,
      image: true,
      borderColor: true,
      links: true,
    },
  });

  if (!user) {
    notFound();
  }

  const parsedUser = {
    ...user,
    links: user.links ? (user.links as { [key: string]: string }) : null,
  };

  return <ProfileClientComponent user={parsedUser} />;
}
