import { getRepository, MigrationInterface } from 'typeorm';
import { User } from '../entities/User';

export class addAdmin1624809609895 implements MigrationInterface {
  public async up(): Promise<void> {
    const userRepository = getRepository(User);
    const user = await userRepository.create({
      name: 'admin',
      login: 'admin',
      password: 'admin',
    });
    userRepository.save(user);
  }

  public async down(): Promise<void> {}
}
