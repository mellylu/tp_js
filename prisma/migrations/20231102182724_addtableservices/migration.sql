-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);
