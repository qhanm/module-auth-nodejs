import "reflect-metadata";

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    type: "timestamp",
  })
  updatedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
