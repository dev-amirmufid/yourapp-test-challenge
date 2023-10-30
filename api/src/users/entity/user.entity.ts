import {
  Entity,
  ObjectId,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  accountId: string;
  @Column()
  name: string;
  @Column()
  birthday: string;
  @Column()
  height: number;
  @Column()
  weight: number;
  @Column()
  interests: string[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(users?: Partial<Users>) {
    Object.assign(this, users);
  }
}
