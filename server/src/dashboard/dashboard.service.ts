import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalVisits = await this.prisma.visit.count();
    const activeLeaders = await this.prisma.user.count({
      where: { role: 'LIDER' }
    });
    const newPeople = await this.prisma.person.count();
    const pendingQuestions = await this.prisma.question.count({
      where: { isAudited: false }
    });

    return {
      totalVisits,
      activeLeaders,
      newPeople,
      pendingQuestions
    };
  }
}
