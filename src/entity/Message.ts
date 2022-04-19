import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Conversation } from "./Conversation";
import { EmBase } from "./EmBase"
import {User} from "./User"
Conversation


@Entity()
export class Message extends EmBase {
  @Column()
  body: string;

  @Column({default:false})
  read: boolean;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation
}
