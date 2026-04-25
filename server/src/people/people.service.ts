import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Person, PersonType, SpiritualStatus } from '@prisma/client';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async findAll(type?: PersonType) {
    return this.prisma.person.findMany({
      where: type ? { type } : {},
      include: {
        assignedLeader: {
          select: { name: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async create(data: {
    name: string;
    address?: string;
    phone?: string;
    type: PersonType;
    status: SpiritualStatus;
    assignedLeaderId: string;
  }) {
    return this.prisma.person.create({
      data,
    });
  }
}
