/*
  Warnings:

  - You are about to drop the column `isActive` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "isActive";
