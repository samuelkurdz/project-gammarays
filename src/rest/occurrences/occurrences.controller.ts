import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { JwtAuthGuard } from 'src/auth';
import { LoggedInUser, ILoggedInUser } from 'src/global';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createOccurrenceDto: CreateOccurrenceDto,
    @LoggedInUser() user: ILoggedInUser,
  ) {
    return this.occurrencesService.create(createOccurrenceDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@LoggedInUser() user: ILoggedInUser) {
    return this.occurrencesService.findAll(user.company);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @LoggedInUser() user: ILoggedInUser) {
    return this.occurrencesService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOccurrenceDto: UpdateOccurrenceDto,
    @LoggedInUser() user: ILoggedInUser,
  ) {
    return this.occurrencesService.update(id, updateOccurrenceDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @LoggedInUser() user: ILoggedInUser) {
    return this.occurrencesService.remove(+id);
  }
}
