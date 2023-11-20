import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "./Result";

export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne((type) => Result)
  @JoinColumn()
  result: Result;
}
