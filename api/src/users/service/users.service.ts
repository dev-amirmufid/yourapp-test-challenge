import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Users } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: MongoRepository<Users>,
  ) {}

  /* Get All */
  async getAllUsers(): Promise<Users[]> {
    const usersData = await this.usersRepository.find();
    if (!usersData || usersData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return usersData;
  }

  /* Get By Id*/
  async getUser(accountId: string): Promise<Users> {
    const existingUser = await this.usersRepository.findOneBy({ accountId });
    if (!existingUser) {
      throw new NotFoundException(`User #${accountId} not found`);
    }
    return existingUser;
  }

  /* Create */
  async createUser(
    accountId: string,
    createUserDto: CreateUserDto,
  ): Promise<Users> {
    const insertData = {
      ...createUserDto,
      accountId,
    };
    console.log(insertData);
    const newUser = await this.usersRepository.save(insertData);
    return newUser;
  }

  /* Update */
  async updateUser(
    accountId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    const updateUser: any = await this.usersRepository.findOneAndUpdate(
      { accountId },
      { $set: updateUserDto },
    );

    return updateUser;
  }

  /* Delete */
  async deleteUser(id: any): Promise<Users> {
    const deletedUser: any = await this.usersRepository.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return deletedUser;
  }
}
