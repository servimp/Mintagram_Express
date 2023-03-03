import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn} from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  title: string;

  @CreateDateColumn()
  creationDate: Date;

  @Column("text")
  imgUrl: string;

  @Column("text")
  imgFilter: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @Column("int")
  idUser: number;
}
