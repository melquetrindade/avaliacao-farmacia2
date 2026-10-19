import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import argon2 from "argon2";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to initialize PrismaClient");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const administradores = [
    {
      nome: "Melquesedek",
      email: "eng.melquesedek@gmail.com",
      password: process.env.ADMIN_PASSWORD,
      passwordVariable: "ADMIN_PASSWORD",
    },
    {
      nome: "Melque Trindade",
      email: "melquetrindade654@gmail.com",
      password: process.env.ADMIN_PASSWORD_MELQUE_TRINDADE,
      passwordVariable: "ADMIN_PASSWORD_MELQUE_TRINDADE",
    },
  ];

  for (const administrador of administradores) {
    if (!administrador.password) {
      throw new Error(
        `${administrador.passwordVariable} is required to seed administrators`,
      );
    }

    const senhaHash = await argon2.hash(administrador.password);

    await prisma.administrador.upsert({
      where: {
        email: administrador.email,
      },
      update: {
        nome: administrador.nome,
        senhaHash,
      },
      create: {
        nome: administrador.nome,
        email: administrador.email,
        senhaHash,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });