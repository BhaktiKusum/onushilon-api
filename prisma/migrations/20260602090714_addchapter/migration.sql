/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,orderNo]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId,name]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNo` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "orderNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_subjectId_orderNo_key" ON "Chapter"("subjectId", "orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_subjectId_name_key" ON "Chapter"("subjectId", "name");
