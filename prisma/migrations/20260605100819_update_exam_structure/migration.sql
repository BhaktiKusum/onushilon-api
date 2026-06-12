/*
  Warnings:

  - Added the required column `academicLevelId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Exam_chapterId_idx";

-- DropIndex
DROP INDEX "Exam_orderNo_idx";

-- DropIndex
DROP INDEX "Exam_subjectId_idx";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "academicLevelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ExamSubject" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "ExamSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamChapter" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "ExamChapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExamSubject_examId_idx" ON "ExamSubject"("examId");

-- CreateIndex
CREATE INDEX "ExamSubject_subjectId_idx" ON "ExamSubject"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSubject_examId_subjectId_key" ON "ExamSubject"("examId", "subjectId");

-- CreateIndex
CREATE INDEX "ExamChapter_examId_idx" ON "ExamChapter"("examId");

-- CreateIndex
CREATE INDEX "ExamChapter_chapterId_idx" ON "ExamChapter"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamChapter_examId_chapterId_key" ON "ExamChapter"("examId", "chapterId");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_academicLevelId_fkey" FOREIGN KEY ("academicLevelId") REFERENCES "AcademicLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSubject" ADD CONSTRAINT "ExamSubject_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSubject" ADD CONSTRAINT "ExamSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamChapter" ADD CONSTRAINT "ExamChapter_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamChapter" ADD CONSTRAINT "ExamChapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
