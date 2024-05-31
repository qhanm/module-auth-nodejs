import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1717039568993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            type: "int",
            name: "id",
            isPrimary: true,
          },
          {
            type: "varchar",
            name: "email",
            isUnique: true,
            length: "60",
          },
          {
            type: "varchar",
            name: "password",
            length: "50",
          },
          {
            type: "timestamp",
            name: "verify_at",
            isNullable: true,
          },
          {
            type: "timestamp",
            name: "created_at",
            isNullable: true,
          },
          {
            type: "timestamp",
            name: "updated_at",
            isNullable: true,
          },
          {
            type: "timestamp",
            name: "deleted_at",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
