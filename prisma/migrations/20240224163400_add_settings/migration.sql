-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "autoPlay" BOOLEAN NOT NULL DEFAULT false,
    "autoPlayDelay" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
