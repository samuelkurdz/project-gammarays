import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePersonDTO } from './create-person.dto';
import { Person, PersonDocument } from './person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.personModel.findOne({ email: email }).lean().exec();
  }

  async findById(id: string) {
    return (
      this.personModel
        .findById(id)
        // .where('isWorker')
        // .equals(true/false)
        .select('-password')
        .lean()
        .exec()
    );
  }

  async findPersons(isWorker: boolean, companyId?: string) {
    if (companyId) {
      return this.personModel
        .find({ isWorker: isWorker })
        .where('company')
        .equals(companyId)
        .select('-password')
        .populate('company', '_id officialEmail companyName category logo')
        .lean()
        .exec();
    }
    return this.personModel
      .find({ isWorker: isWorker })
      .select('-password')
      .populate('company', '_id officialEmail companyName category logo')
      .lean()
      .exec();
  }

  // create person can only be called from company, team or worker services
  // make sure you hash password from above listed service.
  async createPerson(isWorker: boolean, createPersonDTO: CreatePersonDTO) {
    const newPerson = {
      ...createPersonDTO,
      isWorker: isWorker,
    };

    const createdPerson = new this.personModel(newPerson);

    try {
      const created = await createdPerson.save();
      if (created)
        return `${isWorker ? 'Worker' : 'Team-member'} created successfully`;
    } catch (error) {
      return 'error occured';
    }
  }
}
