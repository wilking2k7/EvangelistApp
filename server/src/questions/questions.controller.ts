import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('pending')
  async getPending() {
    return this.questionsService.findPending();
  }

  @Get('published')
  async getPublished() {
    return this.questionsService.findPublished();
  }

  @Post()
  async createQuestion(@Body() data: { content: string, visitId: string }) {
    return this.questionsService.create(data.content, data.visitId);
  }

  @Patch(':id/approve')
  async approveQuestion(@Param('id') id: string, @Body('answer') answer: string) {
    return this.questionsService.approve(id, answer);
  }
}
