-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "folderId" INTEGER NOT NULL DEFAULT -1;

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "index" SERIAL NOT NULL,
    "categories" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);
