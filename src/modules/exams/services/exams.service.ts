import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create Exam
   */
  async create(
    dto: CreateExamDto,
  ) {
    return this.prisma.exam.create({
      data: {
        title: dto.title,
        description: dto.description,

        type: dto.type,

        enrollmentType:
          dto.enrollmentType,

        academicLevelId:
          dto.academicLevelId,

        orderNo:
          dto.orderNo,

        durationMinutes:
          dto.durationMinutes,

        totalMarks:
          dto.totalMarks,

        negativeMarks:
          dto.negativeMarks,

        startAt: dto.startAt
          ? new Date(dto.startAt)
          : null,

        endAt: dto.endAt
          ? new Date(dto.endAt)
          : null,

        maxParticipants:
          dto.maxParticipants,
      },
    });
  }

  /**
   * Admin Exam List
   */
  async findAll() {
    return this.prisma.exam.findMany({
      include: {
        academicLevel: true,
      },

      orderBy: [
        {
          orderNo: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  /**
   * Single Exam
   */
  async findOne(
    id: string,
  ) {
    const exam =
      await this.prisma.exam.findUnique({
        where: {
          id,
        },

        include: {
          academicLevel: true,

          subjects: {
            include: {
              subject: true,
            },
          },

          chapters: {
            include: {
              chapter: true,
            },
          },

          mcqs: true,
        },
      });

    if (!exam) {
      throw new NotFoundException(
        'Exam not found',
      );
    }

    return exam;
  }

  /**
   * Update Exam
   */
  async update(
    id: string,
    dto: UpdateExamDto,
  ) {
    await this.findOne(id);

    return this.prisma.exam.update({
      where: {
        id,
      },

      data: {
        title: dto.title,
        description: dto.description,

        type: dto.type,

        enrollmentType:
          dto.enrollmentType,

        academicLevelId:
          dto.academicLevelId,

        orderNo:
          dto.orderNo,

        durationMinutes:
          dto.durationMinutes,

        totalMarks:
          dto.totalMarks,

        negativeMarks:
          dto.negativeMarks,

        startAt: dto.startAt
          ? new Date(dto.startAt)
          : undefined,

        endAt: dto.endAt
          ? new Date(dto.endAt)
          : undefined,

        maxParticipants:
          dto.maxParticipants,
      },
    });
  }

  /**
   * Publish Exam
   */
  async publish(
    id: string,
  ) {
    await this.findOne(id);

    return this.prisma.exam.update({
      where: {
        id,
      },

      data: {
        isPublished: true,
      },
    });
  }

  /**
   * Soft Delete
   */
  async remove(
    id: string,
  ) {
    await this.findOne(id);

    return this.prisma.exam.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }

  /**
   * Student Exam List
   */
  async findPublishedExams() {
    return this.prisma.exam.findMany({
      where: {
        isPublished: true,
        isActive: true,
      },

      include: {
        academicLevel: true,
      },

      orderBy: [
        {
          orderNo: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  /**
   * Student Exam Details
   */
  async findPublishedExam(
    id: string,
  ) {
    const exam =
      await this.prisma.exam.findFirst({
        where: {
          id,
          isPublished: true,
          isActive: true,
        },

        include: {
          academicLevel: true,

          subjects: {
            include: {
              subject: true,
            },
          },

          chapters: {
            include: {
              chapter: true,
            },
          },
        },
      });

    if (!exam) {
      throw new NotFoundException(
        'Exam not found',
      );
    }

    return exam;
  }

  /**
   * Student Enroll
   */
  async enroll(
    examId: string,
    studentId: string,
  ) {
    const exam =
      await this.prisma.exam.findUnique({
        where: {
          id: examId,
        },
      });

    if (!exam) {
      throw new NotFoundException(
        'Exam not found',
      );
    }

    return this.prisma.examEnrollment.create({
      data: {
        examId,
        studentId,

        status:
          exam.enrollmentType ===
          'APPROVAL'
            ? 'PENDING'
            : 'APPROVED',
      },
    });
  }

  /**
   * Student Enrollments
   */
  async myEnrollments(
    studentId: string,
  ) {
    return this.prisma.examEnrollment.findMany({
      where: {
        studentId,
      },

      include: {
        exam: true,
      },

      orderBy: {
        enrolledAt: 'desc',
      },
    });
  }
}