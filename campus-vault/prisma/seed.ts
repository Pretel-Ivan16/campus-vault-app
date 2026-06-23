import { PrismaClient } from "@/generated/prisma/client";
import { error } from "node:console";

const prisma = new PrismaClient();

async function main() {
  const unr = await prisma.university.upsert({
    where: {
      name: "Universidad Nacional de Rosario",
    },
    update: {},
    create: {
      name: "Universidad Nacional de Rosario",
      country: "Argentina",
      city: "Rosario",
      website: "https://unr.edu.ar",
    },
  });

  const fceia = await prisma.faculty.upsert({
    where: {
      universityId_name: {
        universityId: unr.id,
        name: "Facultad de Ciencias Exactas, Ingeniería y Agrimensura",
      }
    },
    update: {},
    create: {
      universityId: unr.id,
      name: "Facultad de Ciencias Exactas, Ingeniería y Agrimensura",
    },
  });

  const civil = await prisma.career.create({
    data: {
      facultyId: fceia.id,
      name: "Ingeniería Civil",
    },
  });

  await prisma.subject.createMany({
    data: [
      {
        careerId: civil.id,
        name: "Cálculo I",
        code: "CAL1",
        semester: "1"
      },
      {
        careerId: civil.id,
        name: "Introducción a la Física",
        code: "IntFIS",
        semester: "1",
      },
      {
        careerId: civil.id,
        name: "Introducción a la Ingeniería Civil",
        code: "IntING",
        semester: "1",
      },
      {
        careerId: civil.id,
        name: "Álgebra y Geometría Analítca",
        code: "ALyGEO",
        semester: "1",
      },
      {
        careerId: civil.id,
        name: "Representación Gráfica",
        code: "RepGRA",
        semester: "1",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });