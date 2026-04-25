import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findLeaders() {
    return this.prisma.user.findMany({
      where: {
        role: { in: ['LIDER', 'ADMINISTRADOR', 'PASTOR'] }
      },
      select: {
        id: true,
        name: true,
        role: true
      }
    });
  }
}
