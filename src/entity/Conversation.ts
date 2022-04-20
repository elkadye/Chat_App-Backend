import { Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { EmBase } from './EmBase';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Conversation extends EmBase {
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];


  @ManyToMany(()=>User)
  @JoinTable()
  users: User[];
}
