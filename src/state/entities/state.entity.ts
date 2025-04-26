import { cityEntity } from "../../city/entities/city.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'state'})
export class stateEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @Column({ name: 'uf', nullable: false })
  uf: string;
  
  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at'})
  updatedAt: Date;

  @OneToMany(() => cityEntity, (city) => city.state)
  cities?: cityEntity[];
}
