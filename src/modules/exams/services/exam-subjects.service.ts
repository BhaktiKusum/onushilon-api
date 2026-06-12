import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ExamSubjectsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Assign Subjects
   */
  async assign(
    examId: string,
    subjectIds: string[],
  ) {
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

    await this.prisma.examSubject.createMany({
      data: subjectIds.map(
        subjectId => ({
          examId,
          subjectId,
        }),
      ),

      skipDuplicates: true,
    });

    return {
      message:
        'Subjects assigned successfully',
    };
  }

  /**
   * Get Subjects
   */
  async findAll(
    examId: string,
  ) {
    return this.prisma.examSubject.findMany({
      where: {
        examId,
      },

      include: {
        subject: true,
      },
    });
  }

  /**
   * Remove Subject
   */
  async remove(
    examId: string,
    subjectId: string,
  ) {
    return this.prisma.examSubject.delete({
      where: {
        examId_subjectId: {
          examId,
          subjectId,
        },
      },
    });
  }
}