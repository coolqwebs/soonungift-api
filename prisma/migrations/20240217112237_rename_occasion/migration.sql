/*
  Warnings:

  - You are about to drop the column `occassionId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Occassion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `occasionId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_occassionId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "occassionId",
ADD COLUMN     "occasionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Occassion";

-- CreateTable
CREATE TABLE "Occasion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Occasion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Occasion_name_key" ON "Occasion"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "Occasion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
