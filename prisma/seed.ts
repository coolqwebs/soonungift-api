import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { HASH_SALT_ROUNDS } from "../src/utils/constants";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({});

  // Create a random user
  await prisma.user.create({
    data: {
      email: "coolqwebs@gmail.com",
      fullname: "Asankadyrov Nursultan",
      password: await bcrypt.hash("12qw!@QW", HASH_SALT_ROUNDS),
      role: "ADMIN",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
