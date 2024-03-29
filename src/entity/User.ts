import { Entity, Column, ManyToMany, OneToMany } from "typeorm";
import { Conversation } from "./Conversation";
import { EmBase } from "./EmBase"
import {Message} from "./Message"

@Entity()
export class User extends EmBase {
  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({nullable:true})
  image: string;
  @Column()
  password: string;
 

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Conversation,(conversation)=>conversation.users)
  conversations: Conversation[];

  // @ManyToMany((type) => Conversation, (conversation) => conversation.users)
  // conversations: Conversation[];
}
