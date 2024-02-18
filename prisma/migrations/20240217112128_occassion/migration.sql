/*
  Warnings:

  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occassionId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "occassionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Occassion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Occassion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Occassion_name_key" ON "Occassion"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_occassionId_fkey" FOREIGN KEY ("occassionId") REFERENCES "Occassion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
