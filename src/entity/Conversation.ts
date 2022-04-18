import { Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { EmBase } from './EmBase';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class Conversation extends EmBase {
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];


  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
