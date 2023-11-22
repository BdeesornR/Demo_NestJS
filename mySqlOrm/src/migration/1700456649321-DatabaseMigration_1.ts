import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class DatabaseMigration11700456649321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = AppDataSource.getRepository(User);

    const initUser = new User();
    initUser.firstName = "Test";
    initUser.lastName = "Test";
    initUser.age = 28;

    await userRepo.save(initUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
