import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyETY } from './entities/company.entity';

@Injectable()
export class CompanyService {
  companies: CompanyETY[] = [];
  create(createCompanyDto: CreateCompanyDto) {
    return this.companies.push({
      ...createCompanyDto,
      id: this.companies.length.toString(),
    });
  }

  findAll(): CompanyETY[] {
    return this.companies;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
