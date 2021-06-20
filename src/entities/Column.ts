import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from './Board';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn({
    type: 'varchar',
    default: 'COLUMN',
  })
  title: string;

  @TColumn({
    type: 'int',
    default: 0,
  })
  order: number;

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn()
  board: Board;
}
