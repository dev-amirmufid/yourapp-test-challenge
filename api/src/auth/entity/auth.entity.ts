import {
  Entity,
  ObjectId,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
export class Auth {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(auth?: Partial<Auth>) {
    Object.assign(this, auth);
  }
}
