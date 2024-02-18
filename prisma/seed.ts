import bcrypt from "bcrypt"
import { DeliveryType, PrismaClient } from "@prisma/client"
import { HASH_SALT_ROUNDS } from "../src/utils/constants"

const prisma = new PrismaClient()

async function main() {
  // Cleanup existing users
  await prisma.user.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.occasion.deleteMany({})
  await prisma.product.deleteMany({})
  const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS)

  // Create a random user
  await prisma.user.create({
    data: {
      email: "coolqwebs@gmail.com",
      fullname: "Asankadyrov Nursultan",
      password: await bcrypt.hash("12qw!@QW", salt),
      role: "ADMIN",
    },
  })

  const seedCategory = await prisma.category.create({
    data: {
      name: "Flowers",
      image: "/Users/user/Documents/projects/soonungift-api/public/images/telegram-photo-0-5348205320247300813.jpeg",
    },
  })
  const seedOccasion1 = await prisma.occasion.create({
    data: {
      name: "For Lovers",
      image: "/Users/user/Documents/projects/soonungift-api/public/images/telegram-photo-0-5348205320247300813.jpeg",
    },
  })
  await prisma.occasion.create({
    data: {
      name: "Winter",
      image: "/Users/user/Documents/projects/soonungift-api/public/images/telegram-photo-0-5348205320247300813.jpeg",
    },
  })
  await prisma.occasion.create({
    data: {
      name: "Birthday",
      image: "/Users/user/Documents/projects/soonungift-api/public/images/telegram-photo-0-5348205320247300813.jpeg",
    },
  })
  await prisma.occasion.create({
    data: {
      name: "Cozy Gifts",
      image: "/Users/user/Documents/projects/soonungift-api/public/images/telegram-photo-0-5348205320247300813.jpeg",
    },
  })

  await prisma.product.create({
    data: {
      name: "Tulip",
      description: "Tulip Flowers",
      image: "/Users/user/Documents/projects/soonungift-api/public/images/telegram-photo-0-5348205320247300813.jpeg",
      published: true,
      categoryId: seedCategory.id,
      occasionId: seedOccasion1.id,
      price: 1500,
      deliveryType: DeliveryType.Delivery,
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
