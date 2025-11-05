/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - Added the required column `longDescription` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "description",
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "promoPrice" DECIMAL(65,30),
ADD COLUMN     "shortDescription" TEXT NOT NULL;
