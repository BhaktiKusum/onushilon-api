import { BadRequestException,
  Injectable,
  NotFoundException, } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAcademicLevelDto } from '../dto/create-academic-level.dto';
import { UpdateAcademicLevelDto } from '../dto/update-academic-level.dto';

@Injectable()
export class AcademicLevelsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


    async create(
      dto: CreateAcademicLevelDto,
    ) {
      return this.prisma.academicLevel.create({
        data: dto,
      });
    }

  /**
   * Get all academic levels
   */
  async findAll() {
    return this.prisma.academicLevel.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  /**
   * Get academic level by id
   */
  async findOne(id: string) {
    return this.prisma.academicLevel.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
      id: string,
      dto: UpdateAcademicLevelDto,
    ) {
      await this.findOne(id);
  
      return this.prisma.academicLevel.update({
        where: {
          id,
        },
        data: dto,
      });
    }
  
    async delete(id: string) {
        await this.findOne(id);

        return this.prisma.academicLevel.delete({
            where: {
            id,
            },
        });
    }

}

