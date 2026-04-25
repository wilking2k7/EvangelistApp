import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PersonType, SpiritualStatus } from '@prisma/client';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getPeople(@Query('type') type?: PersonType) {
    return this.peopleService.findAll(type);
  }

  @Post()
  async createPerson(
    @Body() data: {
      name: string;
      address?: string;
      phone?: string;
      type: PersonType;
      status: SpiritualStatus;
      assignedLeaderId: string;
    }
  ) {
    return this.peopleService.create(data);
  }
}
