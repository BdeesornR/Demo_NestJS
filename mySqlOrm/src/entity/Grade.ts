import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("grade")
export class Grade extends BaseEntity {
  @Column()
  name: string;

  @Column()
  grade: string;
}
