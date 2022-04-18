import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EmBase extends BaseEntity {
 
    @PrimaryGeneratedColumn()
    id:number
   
    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date    
}