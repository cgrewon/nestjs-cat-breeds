import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  cat_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  breed: string;

  @Column({ nullable: true })
  weight: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
