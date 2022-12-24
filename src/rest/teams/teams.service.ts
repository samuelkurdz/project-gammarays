import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/global';
import { PersonService } from '../person/person.service';
import {
  CreateTeamDto,
  createTeamMemberDefaultApps,
} from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly personService: PersonService) {}

  async create(createTeamDto: CreateTeamDto) {
    const { password } = createTeamDto;
    const hashedpassword = await hashPassword(password);
    createTeamDto.apps = createTeamMemberDefaultApps;
    createTeamDto.password = hashedpassword;
    return this.personService.createPerson(false, createTeamDto);
  }

  async findAll() {
    return this.personService.findPersons(false);
  }

  findOne(id: string) {
    return this.personService.findById(id);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
