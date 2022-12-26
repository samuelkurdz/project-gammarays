import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILoggedInUser } from 'src/global';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import {
  LeanOccurenceDocument,
  Occurence,
  OccurenceDocument,
} from './occurence.schema';

@Injectable()
export class OccurrencesService {
  constructor(
    @InjectModel(Occurence.name)
    private occurenceModel: Model<OccurenceDocument>,
  ) { }

  async create(createOccurrenceDto: CreateOccurrenceDto, user: ILoggedInUser) {
    createOccurrenceDto.company = user.company;
    createOccurrenceDto.createdBy = user._id;

    const newOccurrence = new this.occurenceModel(createOccurrenceDto);
    try {
      const created = await newOccurrence.save();
      if (created) return `Occurrence created successfully`;
    } catch (error) {
      return 'error occured';
    }
  }

  // typeof Promise<LeanOccurenceDocument[]>
  async findAll(companyId: string) {
    return this.occurenceModel
      .find()
      .where('company')
      .equals(companyId)
      .populate('company', '_id companyName')
      .populate('createdBy', '_id firstName lastName email')
      .populate('teams', '-password -apps')
      .lean()
      .exec();
  }

  async findOne(occurrenceId: string, person: ILoggedInUser) {
    const occurrence = await this.getOneOccurrence(occurrenceId);
    const isAllowed = this.isPersonSameCompanyWithOccurrence(
      person,
      occurrence,
    );
    if (!isAllowed)
      throw new ForbiddenException('You dont have access to this organization');
    return occurrence;
  }

  async update(
    occurrenceId: string,
    updateOccurrenceDto: UpdateOccurrenceDto,
    person: ILoggedInUser,
  ) {
    const occurrence = await this.getOneOccurrence(occurrenceId);
    const isAllowed = this.isPersonSameCompanyWithOccurrence(
      person,
      occurrence,
    );
    if (!isAllowed)
      throw new ForbiddenException('You dont have access to this organization');
    return this.occurenceModel
      .findByIdAndUpdate(occurrenceId, updateOccurrenceDto, { new: true })
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} occurrence`;
  }

  async getOneOccurrence(occurrenceId: string) {
    return this.occurenceModel
      .findById(occurrenceId)
      .populate('company', '_id companyName')
      .populate('createdBy', '_id firstName lastName email')
      .populate('teams', '_id firstName lastName email')
      .populate('workers', '_id firstName lastName email')
      .lean()
      .exec();
  }

  isPersonSameCompanyWithOccurrence(
    person: ILoggedInUser,
    occurrence: LeanOccurenceDocument,
  ) {
    // console.log(occurrence.company._id.toString());
    // console.log(person.company);
    return person.company === occurrence.company._id.toString();
  }
}
