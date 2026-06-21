import { prisma } from "@/lib/prisma";

export async function getUniversities(){
  return prisma.university.findMany({
    orderBy:{
      name: "asc",
    },
  });
}

