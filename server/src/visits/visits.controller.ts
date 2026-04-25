import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  async getVisits() {
    return this.visitsService.findAll();
  }

  @Post()
  async createVisit(
    @Body() data: {
      date: string;
      location?: string;
      topic?: string;
      personId: string;
      leaderId: string;
      assistantId?: string;
    }
  ) {
    return this.visitsService.create({
      ...data,
      date: new Date(data.date),
    });
  }

  @Patch(':id/audit')
  async auditVisit(@Param('id') id: string, @Body('isAudited') isAudited: boolean) {
    return this.visitsService.audit(id, isAudited);
  }

  @Post(':id/report')
  async submitReport(
    @Param('id') id: string,
    @Body() data: {
      summary: string;
      location?: string;
      questions?: string[];
      newStatus?: any;
    }
  ) {
    return this.visitsService.submitReport(id, data);
  }
}
