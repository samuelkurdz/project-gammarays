import { Injectable } from '@nestjs/common';
import { CreateTeamMemberInput } from './dto/create-team-member.input';
import { UpdateTeamMemberInput } from './dto/update-team-member.input';

@Injectable()
export class TeamMembersService {
  create(createTeamMemberInput: CreateTeamMemberInput) {
    return 'This action adds a new teamMember';
  }

  findAll() {
    return [{ exampleField: 889 }];
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMember`;
  }

  update(id: number, updateTeamMemberInput: UpdateTeamMemberInput) {
    return `This action updates a #${id} teamMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMember`;
  }
}
