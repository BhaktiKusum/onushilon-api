import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { CreateSubjectAssignmentDto } from '../dto/create-subject-assignment.dto';

@Injectable()
export class SubjectAssignmentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Assign subject to multiple academic levels
   */
  async create(
    dto: CreateSubjectAssignmentDto,
  ) {
    const subject =
      await this.prisma.subject.findUnique({
        where: {
          id: dto.subjectId,
        },
      });

    if (!subject) {
      throw new BadRequestException(
        'Subject not found',
      );
    }

    const assignments =
      dto.academicLevelIds.map(
        academicLevelId => ({
          academicLevelId,
          subjectId: dto.subjectId,
        }),
      );

    await this.prisma.subjectAssignment.createMany({
      data: assignments,
      skipDuplicates: true,
    });

    return {
      message:
        'Subject assigned successfully',
    };
  }

  /**
   * Get all assignments
   */
  async findAll() {
    return this.prisma.subjectAssignment.findMany({
      include: {
        subject: true,
        academicLevel: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Remove assignment
   */
  async remove(id: string) {
    return this.prisma.subjectAssignment.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Academic level subjects
   */
  async getAcademicLevelSubjects(
    academicLevelId: string,
  ) {
    return this.prisma.subjectAssignment.findMany({
      where: {
        academicLevelId,
      },

      include: {
        subject: true,
      },
    });
  }
}