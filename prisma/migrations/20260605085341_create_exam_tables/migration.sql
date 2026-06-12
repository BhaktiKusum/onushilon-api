-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('PRACTICE', 'LIVE');

-- CreateEnum
CREATE TYPE "EnrollmentType" AS ENUM ('OPEN', 'APPROVAL');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ExamType" NOT NULL,
    "enrollmentType" "EnrollmentType" NOT NULL DEFAULT 'OPEN',
    "subjectId" TEXT,
    "chapterId" TEXT,
    "orderNo" INTEGER,
    "durationMinutes" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "negativeMarks" DECIMAL(5,2),
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "maxParticipants" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamEnrollment" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'APPROVED',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Exam_subjectId_idx" ON "Exam"("subjectId");

-- CreateIndex
CREATE INDEX "Exam_chapterId_idx" ON "Exam"("chapterId");

-- CreateIndex
CREATE INDEX "Exam_orderNo_idx" ON "Exam"("orderNo");

-- CreateIndex
CREATE INDEX "ExamEnrollment_examId_idx" ON "ExamEnrollment"("examId");

-- CreateIndex
CREATE INDEX "ExamEnrollment_studentId_idx" ON "ExamEnrollment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamEnrollment_examId_studentId_key" ON "ExamEnrollment"("examId", "studentId");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamEnrollment" ADD CONSTRAINT "ExamEnrollment_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamEnrollment" ADD CONSTRAINT "ExamEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
