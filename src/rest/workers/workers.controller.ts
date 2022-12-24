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
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { JwtAuthGuard } from 'src/auth';
import { LoggedInUser, Token } from 'src/global';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createWorkerDto: CreateWorkerDto,
    @LoggedInUser() user: Token,
  ) {
    console.log(user);
    return this.workersService.create(createWorkerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.workersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersService.remove(+id);
  }
}
