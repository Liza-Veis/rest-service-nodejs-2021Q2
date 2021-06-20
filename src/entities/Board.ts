import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task';
import { Column as ColumnModel } from '../resources/boards/column.model';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: 'BOARD',
  })
  title: string;

  @Column({ type: 'json' })
  columns: ColumnModel[];

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];
}
