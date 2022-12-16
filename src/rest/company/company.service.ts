import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  companies: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createCompanyDto: CreateCompanyDto) {
    this.companies.push(createCompanyDto);
    return {
      message: 'This action adds a new company',
      created: this.companies[this.companies.length - 1],
    };
  }

  findAll() {
    return {
      message: 'This action returns all company',
      created: this.companies,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
