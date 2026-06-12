import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserRole } from '../../../common/enums/user-role.enum';
import { PasswordUtil } from '../../../common/utils/password.util';

import { PrismaService } from '../../../prisma/prisma.service';

import { LoginDto } from '../dto/login.dto';
import { StudentSignupDto } from '../dto/student-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Student Registration
   */
  async studentSignup(dto: StudentSignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Phone already exists');
    }

    const hashedPassword = await PasswordUtil.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        password: hashedPassword,
        role: UserRole.STUDENT,
        academicLevelId: dto.academicLevelId,
      },
    });

    return this.generateToken(user.id, user.role);
  }

  /**
   * Login for all user types
   */
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatched = await PasswordUtil.compare(
      dto.password,
      user.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user.id, user.role);
  }

  /**
   * Generate JWT token
   */
  private generateToken(userId: string, role: string) {
    const payload = {
      sub: userId,
      role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}