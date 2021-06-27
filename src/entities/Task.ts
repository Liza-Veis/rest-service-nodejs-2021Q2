import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Board } from './Board';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    default: 'TASK',
  })
  title!: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  description!: string;

  @Column({
    type: 'int',
    default: 0,
  })
  order!: number;

  @Column({
    default: null,
  })
  userId!: string;

  @Column({
    default: null,
  })
  columnId!: string;

  @Column({
    nullable: false,
  })
  boardId!: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Board, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  board!: Board;
}
