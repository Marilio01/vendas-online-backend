import { cityEntity } from 'src/city/entities/city.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class addressEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'number', nullable: false })
  numberAddress: number;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (User) => User.addresses)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: UserEntity;

  @ManyToOne(() => cityEntity, (city) => city.addresses)
  @JoinColumn({
    name: 'city_id',
    referencedColumnName: 'id',
  })
  city?: cityEntity;
}
