import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ExamChaptersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Assign Chapters
   */
  async assign(
    examId: string,
    chapterIds: string[],
  ) {
    const exam = await this.prisma.exam.findUnique({
        where: { id: examId, },
      });

    if (!exam) {
      throw new BadRequestException(
        'Exam not found',
      );
    }

    const chapters = await this.prisma.chapter.findMany({
        where: { id: {
            in: chapterIds,
          },
        },

        select: {
          id: true,
        },
      });

    if (
      chapters.length !==
      chapterIds.length
    ) {
      throw new BadRequestException(
        'One or more chapters not found',
      );
    }

    await this.prisma.examChapter.createMany({
      data: chapterIds.map(
        chapterId => ({
          examId,
          chapterId,
        }),
      ),

      skipDuplicates: true,
    });

    return {
      message:
        'Chapters assigned successfully',
    };
  }

  /**
   * Get Chapters
   */
  async findAll(
    examId: string,
  ) {
    return this.prisma.examChapter.findMany({
      where: {
        examId,
      },

      include: {
        chapter: {
          include: {
            subject: true,
          },
        },
      },

      orderBy: {
        chapter: {
          orderNo: 'asc',
        },
      },
    });
  }

  /**
   * Remove Chapter
   */
  async remove(
    examId: string,
    chapterId: string,
  ) {
    return this.prisma.examChapter.delete({
      where: {
        examId_chapterId: {
          examId,
          chapterId,
        },
      },
    });
  }
}