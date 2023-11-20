import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
