import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.visit.findMany({
      include: {
        person: { select: { name: true } },
        leader: { select: { name: true } },
        assistant: { select: { name: true } },
        questions: true,
      },
      orderBy: { date: 'asc' },
    });
  }

  async create(data: {
    date: Date;
    location?: string;
    topic?: string;
    personId: string;
    leaderId: string;
    assistantId?: string;
  }) {
    return this.prisma.visit.create({
      data,
    });
  }

  async audit(id: string, isAudited: boolean) {
    return this.prisma.visit.update({
      where: { id },
      data: { isAudited },
    });
  }
}
