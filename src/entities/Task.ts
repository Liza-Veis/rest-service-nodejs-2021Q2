import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Column } from './Column';
import { Board } from './Board';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn({
    type: 'varchar',
    default: 'TASK',
  })
  title: string;

  @TColumn({
    type: 'varchar',
    default: '',
  })
  description: string;

  @TColumn({
    type: 'int',
    default: 0,
  })
  order: number;

  @TColumn({
    default: null,
  })
  userId: number;

  @TColumn({
    default: null,
  })
  columnId: number;

  @TColumn({
    nullable: false,
  })
  boardId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Column)
  @JoinColumn()
  column: Column;

  @ManyToOne(() => Board, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  board: Board;
}
