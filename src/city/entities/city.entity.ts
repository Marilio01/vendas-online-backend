import { addressEntity } from "src/address/entities/address.entity";
import { stateEntity } from "src/state/entities/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'city'})
export class cityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({name: 'state_id', nullable: false})
  stateId: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at'})
  updatedAt: Date;

  @OneToMany(() => addressEntity, (address) => address.city)
  addresses?: addressEntity[];

  @ManyToOne(() => stateEntity, (state) => state.cities)
    @JoinColumn({
      name: 'state_id',
      referencedColumnName: 'id',
    })
    state?: stateEntity;
  
}
