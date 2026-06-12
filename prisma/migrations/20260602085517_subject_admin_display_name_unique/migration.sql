/*
  Warnings:

  - A unique constraint covering the columns `[adminDisplayName]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Subject_name_adminDisplayName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Subject_adminDisplayName_key" ON "Subject"("adminDisplayName");
