-- CreateEnum
CREATE TYPE "MCQType" AS ENUM ('STANDARD', 'MULTI_STATEMENT');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "MCQ" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "type" "MCQType" NOT NULL,
    "scenario" JSONB,
    "question" JSONB NOT NULL,
    "options" JSONB NOT NULL,
    "correctOptionKey" TEXT NOT NULL,
    "explanation" JSONB,
    "references" JSONB,
    "optionCount" INTEGER NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL DEFAULT 'MEDIUM',
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MCQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MCQ_subjectId_idx" ON "MCQ"("subjectId");

-- CreateIndex
CREATE INDEX "MCQ_chapterId_idx" ON "MCQ"("chapterId");

-- CreateIndex
CREATE INDEX "MCQ_topicId_idx" ON "MCQ"("topicId");

-- CreateIndex
CREATE INDEX "MCQ_difficulty_idx" ON "MCQ"("difficulty");

-- CreateIndex
CREATE INDEX "MCQ_type_idx" ON "MCQ"("type");

-- CreateIndex
CREATE INDEX "MCQ_isPremium_idx" ON "MCQ"("isPremium");

-- CreateIndex
CREATE INDEX "MCQ_isActive_idx" ON "MCQ"("isActive");

-- AddForeignKey
ALTER TABLE "MCQ" ADD CONSTRAINT "MCQ_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQ" ADD CONSTRAINT "MCQ_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQ" ADD CONSTRAINT "MCQ_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
