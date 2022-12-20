import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamMemberInput } from './dto/create-team-member.input';
// import { UpdateTeamMemberInput } from './dto/update-team-member.input';
import { TeamMember, TeamMemberDocument } from './team-members.schema';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async create(createTeamMemberInput: CreateTeamMemberInput) {
    const newTeamMember = new this.teamMemberModel(createTeamMemberInput);

    try {
      const created = await newTeamMember.save();
      if (created) return 'team-member created successfully';
    } catch (error) {
      return 'error occured';
    }
  }

  findAll() {
    return this.teamMemberModel
      .find()
      .populate('company', '-officialEmail -password -apps')
      .lean()
      .exec();
  }

  findOne(id: string) {
    return this.teamMemberModel
      .findById(id)
      .populate('company', '-officialEmail -password -apps')
      .lean()
      .exec();
  }

  // update(id: number, updateTeamMemberInput: UpdateTeamMemberInput) {
  //   return `This action updates a #${id} teamMember`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} teamMember`;
  // }
}
