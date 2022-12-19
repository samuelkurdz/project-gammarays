import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    const companies = await this.companyService.findAll();
    return {
      message: '',
      data: companies,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return {
      message: '',
      data: await this.companyService.findById(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return {
      message: '',
      data: await this.companyService.update(id, updateCompanyDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      message: '',
      data: await this.companyService.remove(id),
    };
  }
}
