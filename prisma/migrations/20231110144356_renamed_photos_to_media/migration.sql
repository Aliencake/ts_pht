/*
  Warnings:

  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PHOTO', 'VIDEO');

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_categoryId_fkey";

-- DropTable
DROP TABLE "Photo";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "href" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'PHOTO',
    "index" SERIAL NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
