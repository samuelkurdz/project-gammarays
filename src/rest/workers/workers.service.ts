import { Injectable } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  constructor(private readonly personService: PersonService) {}

  create(createWorkerDto: CreateWorkerDto) {
    return 'This action adds a new worker';
  }

  async findAll() {
    return await this.personService.findPersons(true);
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
