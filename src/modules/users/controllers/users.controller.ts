import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';

import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { UserRole } from '../../../common/enums/user-role.enum';

import { ChangeNameDto } from '../dto/change-name.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { ChangeAcademicLevelDto } from '../dto/change-academic-level.dto';
import { ApiBearerAuth } from '@nestjs/swagger';



@ApiBearerAuth('access-token')

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  /**
   * Profile
   */

  @Get('profile')
  getProfile(
    @CurrentUser() user,
  ) {
    console.log(user);
    return this.usersService.getProfile(
      user.id,
    );
  }

  /**
   * Change name
   */
  @Patch('change-name')
  changeName(
    @CurrentUser() user,
    @Body() dto: ChangeNameDto,
  ) {
    return this.usersService.changeName(
      user.id,
      dto.name,
    );
  }

  /**
   * Change password
   */
  @Patch('change-password')
  changePassword(
    @CurrentUser() user,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      user.id,
      dto.currentPassword,
      dto.newPassword,
    );
  }

  @Patch('change-academic-level')
  changeAcademicLevel(
    @CurrentUser() user,
    @Body() dto: ChangeAcademicLevelDto,
  ) {
    return this.usersService.changeAcademicLevel(
      user.id,
      dto.academicLevelId,
    );
  }

  /**
   * Create Admin/Subadmin
   */
  @Post('admins')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseGuards(RolesGuard)
  createAdmin(
    @Body() dto: CreateAdminDto,
  ) {
    return this.usersService.createAdmin(
      dto,
    );
  }

  /**
   * Get Admins
   */
  @Get('admins')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseGuards(RolesGuard)
  getAdmins() {
    return this.usersService.getAdmins();
  }

  /**
   * Get Admin Details
   */
  @Get('admins/:id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseGuards(RolesGuard)
  getAdminById(
    @Param('id') id: string,
  ) {
    return this.usersService.getAdminById(
      id,
    );
  }

  /**
   * Update Admin
   */
  @Patch('admins/:id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseGuards(RolesGuard)
  updateAdmin(
    @Param('id') id: string,
    @Body() dto: UpdateAdminDto,
  ) {
    return this.usersService.updateAdmin(
      id,
      dto,
    );
  }

  /**
   * Delete Admin
   */
  @Delete('admins/:id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseGuards(RolesGuard)
  deleteAdmin(
    @Param('id') id: string,
  ) {
    return this.usersService.deleteAdmin(
      id,
    );
  }

  /**
   * Students
   */
  // @Get('students')
  // @Roles(
  //   UserRole.ADMIN,
  //   UserRole.SUBADMIN,
  // )
  // @UseGuards(RolesGuard)
  // getStudents(
  //   @Query('page', ParseIntPipe)
  //   page = 1,

  //   @Query('limit', ParseIntPipe)
  //   limit = 20,
  // ) {
  //   return this.usersService.getStudents(
  //     page,
  //     limit,
  //   );
  // }

  @Get('students')
@Roles(
  UserRole.ADMIN,
  UserRole.SUBADMIN,
)
@UseGuards(RolesGuard)
getStudents(
  @Query(
    'page',
    new DefaultValuePipe(1),
    ParseIntPipe,
  )
  page: number,

  @Query(
    'limit',
    new DefaultValuePipe(20),
    ParseIntPipe,
  )
  limit: number,
) {
  return this.usersService.getStudents(
    page,
    limit,
  );
}

  /**
   * Student Details
   */
  @Get('students/:id')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUBADMIN,
  )
  @UseGuards(RolesGuard)
  getStudentById(
    @Param('id') id: string,
  ) {
    return this.usersService.getStudentById(
      id,
    );
  }
}