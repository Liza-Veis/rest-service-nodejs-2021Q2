import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashPassword } from '../utils/hashHelper';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    default: 'USER',
  })
  name!: string;

  @Column({
    type: 'varchar',
    default: 'user',
  })
  login!: string;

  @Column({
    type: 'varchar',
    default: 'P@55w0rd',
  })
  password!: string;

  static toResponse(user: User): Omit<User, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
