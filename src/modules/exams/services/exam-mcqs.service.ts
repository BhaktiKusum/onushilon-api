import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ExamMcqsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Assign MCQs to Exam
   */
  async assign(
    examId: string,
    mcqIds: string[],
  ) {
    /**
     * Check Exam Exists
     */
    const exam =
      await this.prisma.exam.findUnique({
        where: {
          id: examId,
        },
      });

    if (!exam) {
      throw new BadRequestException(
        'Exam not found',
      );
    }

    /**
     * Check MCQs Exist
     *
     * Replace mCQ with your actual
     * prisma model name if needed.
     */
    const existingMcqs =
      await this.prisma.mCQ.findMany({
        where: {
          id: {
            in: mcqIds,
          },
        },

        select: {
          id: true,
        },
      });

    const existingMcqIds =
      existingMcqs.map(
        mcq => mcq.id,
      );

    const missingMcqs =
      mcqIds.filter(
        id =>
          !existingMcqIds.includes(
            id,
          ),
      );

    if (missingMcqs.length) {
      throw new BadRequestException(
        `MCQ not found: ${missingMcqs.join(', ')}`,
      );
    }

    /**
     * Create Exam MCQs
     */
    await this.prisma.examMcq.createMany({
      data: mcqIds.map(
        (
          mcqId,
          index,
        ) => ({
          examId,
          mcqId,

          orderNo:
            index + 1,

          mark: 1,
        }),
      ),

      skipDuplicates: true,
    });

    /**
     * Return Assigned MCQs
     */
    return this.prisma.examMcq.findMany({
      where: {
        examId,
      },

      include: {
        mcq: {
          select: {
            id: true,
            question: true,
            type: true,
          },
        },
      },

      orderBy: {
        orderNo: 'asc',
      },
    });
  }

  /**
   * Exam MCQs
   */
  async findAll(
    examId: string,
  ) {
    return this.prisma.examMcq.findMany({
      where: {
        examId,
      },

      include: {
        mcq: true,
      },

      orderBy: {
        orderNo: 'asc',
      },
    });
  }

  /**
   * Remove MCQ
   */
  async remove(
    examId: string,
    mcqId: string,
  ) {
    return this.prisma.examMcq.delete({
      where: {
        examId_mcqId: {
          examId,
          mcqId,
        },
      },
    });
  }
}