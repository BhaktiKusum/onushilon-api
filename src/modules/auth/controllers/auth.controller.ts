import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { LoginDto } from '../dto/login.dto';
import { StudentSignupDto } from '../dto/student-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Student Registration
   */
  @Post('student/signup')
  async studentSignup(
    @Body() dto: StudentSignupDto,
  ) {
    console.log("hello");
    return this.authService.studentSignup(dto);
  }

  /**
   * Login
   */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}