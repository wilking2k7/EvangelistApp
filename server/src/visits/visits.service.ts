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

  async submitReport(id: string, data: {
    summary: string;
    location?: string;
    questions?: string[];
    newStatus?: any;
  }) {
    const visit = await this.prisma.visit.update({
      where: { id },
      data: {
        summary: data.summary,
        location: data.location,
        isAudited: false, // Se reinicia para que el pastor revise el reporte si es necesario
      },
    });

    if (data.questions && data.questions.length > 0) {
      await this.prisma.question.createMany({
        data: data.questions.map(content => ({
          content,
          visitId: id,
        })),
      });
    }

    if (data.newStatus) {
      await this.prisma.person.update({
        where: { id: visit.personId },
        data: { status: data.newStatus },
      });
    }

    return visit;
  }
}
