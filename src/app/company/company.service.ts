import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/global/utils';
import { PersonService } from '../person/person.service';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private readonly personService: PersonService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const hashedpassword = await hashPassword(createCompanyDto.password);
    const createCompanyWithHashedPassword: CreateCompanyDto = {
      ...createCompanyDto,
      password: hashedpassword,
    };

    const createdCompany = new this.companyModel(
      createCompanyWithHashedPassword,
    );

    try {
      const created = await createdCompany.save();
      const adminTeamMember = {
        firstName: createCompanyDto.companyName,
        lastName: 'Admin',
        email: createCompanyDto.officialEmail,
        company: created._id.toString(),
        password: hashedpassword,
        isWorker: false,
        apps: {
          teams: ['*'],
          workers: ['*'],
          events: ['*'],
          attendance: ['*'],
        },
      };
      await this.personService.createTeamMember(adminTeamMember);
      if (created) return 'company created successfully';
    } catch (error) {
      return 'error occured';
    }
  }

  async findAll() {
    return this.companyModel.find().select('-password').lean().exec();
  }

  async findById(id: string) {
    return this.companyModel.findById(id).lean().exec();
  }

  async findByEmail(email: string) {
    return this.companyModel.findOne({ officialEmail: email }).lean().exec();
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto)
      .select('-password')
      .lean()
      .exec();
  }

  async remove(id: string) {
    return this.companyModel
      .findByIdAndDelete(id)
      .select('-password')
      .lean()
      .exec();
  }
}
