import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/global';
import { PersonService } from '../person/person.service';
import {
  createWorkerDefaultApps,
  CreateWorkerDto,
} from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  constructor(private readonly personService: PersonService) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const { password } = createWorkerDto;
    const hashedpassword = await hashPassword(password);
    createWorkerDto.apps = createWorkerDefaultApps;
    createWorkerDto.password = hashedpassword;
    return this.personService.createPerson(true, createWorkerDto);
  }

  async findAll() {
    return await this.personService.findPersons(true);
  }

  findOne(id: string) {
    return this.personService.findById(id);
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
