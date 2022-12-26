import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { LoggedInUser, ILoggedInUser } from 'src/global';
import { JwtAuthGuard } from 'src/auth';
import {
  AbilityFactory,
  Actions,
  Subjects,
} from 'src/ability/ability-factory/ability-factory';

@Controller('teams')
export class TeamsController {
  constructor(
    private abilityFactory: AbilityFactory,
    private readonly teamsService: TeamsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @LoggedInUser() user: ILoggedInUser,
  ) {
    console.log(user);
    return this.teamsService.create(createTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@LoggedInUser() user: ILoggedInUser) {
    const ability = this.abilityFactory.defineAbility(user.apps);
    const isAllowed = ability.can(Actions.Read, Subjects.Teams);
    if (!isAllowed) throw new ForbiddenException('insufficient authorization');
    return this.teamsService.findAll(user.company);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @LoggedInUser() user: ILoggedInUser) {
    console.log(user);
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
