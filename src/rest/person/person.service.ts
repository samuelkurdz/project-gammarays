import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto } from '../teams/dto/create-team.dto';
import { CreateWorkerDto } from '../workers/dto/create-worker.dto';
import { Person, PersonDocument } from './person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.personModel.findOne({ officialEmail: email }).lean().exec();
  }

  async findPersons(isWorker: boolean) {
    return this.personModel
      .find({ isWorker: isWorker })
      .select('-password')
      .populate('company', '-officialEmail -password -apps')
      .lean()
      .exec();
  }

  async createTeamMember(createTeamDto: CreateTeamDto) {
    const newTeamMember = {
      ...createTeamDto,
      isWorker: false,
    };

    const createdTeamMember = new this.personModel(newTeamMember);

    try {
      const created = await createdTeamMember.save();
      if (created) return 'Team-member created successfully';
    } catch (error) {
      return 'error occured';
    }
  }

  async createWorker(createWorkerDto: CreateWorkerDto) {
    const newWorker = {
      ...createWorkerDto,
      isWorker: true,
    };

    const createdWorker = new this.personModel(newWorker);

    try {
      const created = await createdWorker.save();
      if (created) return 'Worker created successfully';
    } catch (error) {
      return 'error occured';
    }
  }
}
