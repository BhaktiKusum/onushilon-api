import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create Topic
   */
  async create(
    dto: CreateTopicDto,
  ) {
    const chapter =
      await this.prisma.chapter.findUnique({
        where: {
          id: dto.chapterId,
        },
      });

    if (!chapter) {
      throw new BadRequestException(
        'Chapter not found',
      );
    }

    const existingTopic =
      await this.prisma.topic.findFirst({
        where: {
          chapterId: dto.chapterId,
          OR: [
            {
              name: dto.name,
            },
            {
              orderNo: dto.orderNo,
            },
          ],
        },
      });

    if (existingTopic) {
      throw new BadRequestException(
        'Topic name or order already exists',
      );
    }

    return this.prisma.topic.create({
      data: dto,
    });
  }

  /**
   * Get Topics
   */
  async findAll(
    chapterId?: string,
  ) {
    return this.prisma.topic.findMany({
      where: {
        ...(chapterId && {
          chapterId,
        }),

        isActive: true,
      },

      include: {
        chapter: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        orderNo: 'asc',
      },
    });
  }

  /**
   * Get Topic Details
   */
  async findOne(id: string) {
    const topic =
      await this.prisma.topic.findUnique({
        where: {
          id,
        },

        include: {
          chapter: {
            include: {
              subject: true,
            },
          },
        },
      });

    if (!topic) {
      throw new NotFoundException(
        'Topic not found',
      );
    }

    return topic;
  }

  /**
   * Update Topic
   */
  async update(
    id: string,
    dto: UpdateTopicDto,
  ) {
    await this.findOne(id);

    return this.prisma.topic.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  /**
   * Soft Delete Topic
   */
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.topic.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}