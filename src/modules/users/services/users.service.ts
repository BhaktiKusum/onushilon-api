import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { PasswordUtil } from '../../../common/utils/password.util';
import { UserRole } from '../../../common/enums/user-role.enum';
import { UpdateAdminDto } from '../dto/update-admin.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        academicLevel: true,
      },
    });
  }

  async changeName(
    userId: string,
    name: string,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { name },
    });
  }

  async changeAcademicLevel(
    userId: string,
    academicLevelId: string,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { academicLevelId },
    });
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user =
  await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

if (!user) {
  throw new NotFoundException(
    'User not found',
  );
}

const matched =
  await PasswordUtil.compare(
    currentPassword,
    user.password,
  );

    if (!matched) {
      throw new BadRequestException(
        'Current password incorrect',
      );
    }

    const hashedPassword =
      await PasswordUtil.hash(newPassword);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password changed successfully',
    };
  }

  async createAdmin(dto) {
    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          phone: dto.phone,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'Phone already exists',
      );
    }

    const hashedPassword =
      await PasswordUtil.hash(dto.password);

    return this.prisma.user.create({
      data: {
        phone: dto.phone,
        password: hashedPassword,
        role: dto.role,
      },
    });
  }

  async getAdmins() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: [
            UserRole.ADMIN,
            UserRole.SUBADMIN,
          ],
        },
        isActive: true,
      },
    });
  }

  async deleteAdmin(id: string) {
    const user =
      await this.prisma.user.findUnique({
        where: { id },
      });

    if (!user) {
      throw new NotFoundException(
        'Admin not found',
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }


  /**
 * Get single admin
 */
async getAdminById(id: string) {
  const admin = await this.prisma.user.findFirst({
    where: {
      id,
      role: {
        in: ['ADMIN', 'SUBADMIN'],
      },
    },
  });

  if (!admin) {
    throw new NotFoundException('Admin not found');
  }

  return admin;
}

/**
 * Update admin/subadmin
 */
async updateAdmin(
  id: string,
  dto: UpdateAdminDto,
) {
  const admin = await this.prisma.user.findFirst({
    where: {
      id,
      role: {
        in: ['ADMIN', 'SUBADMIN'],
      },
    },
  });

  if (!admin) {
    throw new NotFoundException('Admin not found');
  }

  const updateData: any = {
    role: dto.role,
    phone: dto.phone,
    isActive: dto.isActive,
  };

  if (dto.password) {
    updateData.password =
      await PasswordUtil.hash(dto.password);
  }

  return this.prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });
}

/**
 * Get students
 */
async getStudents(
  page = 1,
  limit = 20,
) {
  const skip = (page - 1) * limit;

  const [students, total] =
    await Promise.all([
      this.prisma.user.findMany({
        where: {
          role: 'STUDENT',
          isActive: true,
        },
        include: {
          academicLevel: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.user.count({
        where: {
          role: 'STUDENT',
          isActive: true,
        },
      }),
    ]);

  return {
    data: students,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}


/**
 * Get student details
 */
async getStudentById(id: string) {
  const student =
    await this.prisma.user.findFirst({
      where: {
        id,
        role: 'STUDENT',
      },
      include: {
        academicLevel: true,
      },
    });

  if (!student) {
    throw new NotFoundException(
      'Student not found',
    );
  }

  return student;
}

}