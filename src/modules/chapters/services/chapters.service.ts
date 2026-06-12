import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateChapterDto,
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

    return this.prisma.chapter.create({
      data: dto,
    });
  }

  async findAll(
    subjectId?: string,
  ) {
    return this.prisma.chapter.findMany({
      where: {
        subjectId,
        isActive: true,
      },

      include: {
        subject: true,
      },

      orderBy: {
        orderNo: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const chapter =
      await this.prisma.chapter.findUnique({
        where: {
          id,
        },

        include: {
          subject: true,
        },
      });

    if (!chapter) {
      throw new NotFoundException(
        'Chapter not found',
      );
    }

    return chapter;
  }

  async update(
    id: string,
    dto: UpdateChapterDto,
  ) {
    await this.findOne(id);

    return this.prisma.chapter.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.chapter.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}