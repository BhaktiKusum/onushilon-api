import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  /**
   * Hash plain password
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compare plain and hashed password
   */
  static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}