import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("tweet")
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 80 })
  title: string;

  @Column({ type: "varchar", length: 100 })
  content: string;

  @ManyToOne((type) => User, (user) => user.tweets)
  user: User;
}
