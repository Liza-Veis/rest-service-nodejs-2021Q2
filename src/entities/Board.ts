import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TColumn,
  OneToMany,
} from 'typeorm';
import { Column } from './Column';
import { Task } from './Task';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn({
    type: 'varchar',
    default: 'BOARD',
  })
  title: string;

  @OneToMany(() => Column, (column) => column.board)
  columns: Column[];

  @OneToMany(() => Task, (task) => task.board)
  tasks: Column[];
}
