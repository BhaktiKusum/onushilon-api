-- CreateTable
CREATE TABLE "ExamMcq" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "mcqId" TEXT NOT NULL,
    "orderNo" INTEGER,
    "mark" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamMcq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExamMcq_examId_idx" ON "ExamMcq"("examId");

-- CreateIndex
CREATE INDEX "ExamMcq_mcqId_idx" ON "ExamMcq"("mcqId");

-- CreateIndex
CREATE INDEX "ExamMcq_orderNo_idx" ON "ExamMcq"("orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "ExamMcq_examId_mcqId_key" ON "ExamMcq"("examId", "mcqId");

-- AddForeignKey
ALTER TABLE "ExamMcq" ADD CONSTRAINT "ExamMcq_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamMcq" ADD CONSTRAINT "ExamMcq_mcqId_fkey" FOREIGN KEY ("mcqId") REFERENCES "MCQ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
