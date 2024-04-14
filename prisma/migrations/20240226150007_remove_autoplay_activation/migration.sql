/*
  Warnings:

  - You are about to drop the column `autoPlay` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "autoPlay",
ALTER COLUMN "autoPlayDelay" SET DEFAULT 0;
