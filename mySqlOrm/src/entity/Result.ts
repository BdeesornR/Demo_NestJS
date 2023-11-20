import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("result")
export class Result extends BaseEntity {
  @Column()
  eligible: string;
}
