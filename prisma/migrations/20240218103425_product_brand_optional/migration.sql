-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_occasionId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "occasionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "Occasion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
