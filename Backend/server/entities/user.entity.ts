import { Entity, Column } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity({
  name: "user",
  synchronize: true
})
export default class UserEntity extends CoreEntity {

  @Column({ name: "first_name", default: null })
  firstName: String;

  @Column({ name: "last_name", default: null })
  lastName: String;

  @Column({ name: "mail", default: null })
  emailAddress: String;

  @Column({ name: "password", default: null })
  hashPassword: String;
}
