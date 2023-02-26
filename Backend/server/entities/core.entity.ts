// import node modules
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: Number;

  @CreateDateColumn({ name: "created_time" })
  createdTime: Date;

}
