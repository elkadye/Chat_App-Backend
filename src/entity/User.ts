import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { EmBase } from "./EmBase"
import {Message} from "./Message"

@Entity()
export class User extends EmBase {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

}
