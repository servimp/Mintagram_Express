import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  username: string;

  @Column("text")
  firstname: string;

  @Column("text")
  lastname: string;

  @Column("text")
  password: string;

  @Column("text")
  rtoken: string;

  @CreateDateColumn()
  tokenExpiresAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
