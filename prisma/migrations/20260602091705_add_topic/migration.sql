/*
  Warnings:

  - A unique constraint covering the columns `[chapterId,orderNo]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterId,name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNo` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "orderNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_chapterId_orderNo_key" ON "Topic"("chapterId", "orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_chapterId_name_key" ON "Topic"("chapterId", "name");
