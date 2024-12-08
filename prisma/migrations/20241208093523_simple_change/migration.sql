/*
  Warnings:

  - You are about to drop the column `Desc` on the `Donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "Desc",
ADD COLUMN     "desc" TEXT;
