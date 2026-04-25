import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findPending() {
    return this.prisma.question.findMany({
      where: { isAudited: false },
      include: {
        visit: {
          include: {
            person: { select: { name: true } },
            leader: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findPublished() {
    return this.prisma.question.findMany({
      where: { isAudited: true },
      include: {
        visit: {
          select: { topic: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async approve(id: string, answer: string) {
    return this.prisma.question.update({
      where: { id },
      data: {
        answer,
        isAudited: true
      }
    });
  }

  async create(content: string, visitId: string) {
    return this.prisma.question.create({
      data: {
        content,
        visitId,
        isAudited: false
      }
    });
  }
}
