import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { PeopleModule } from './people/people.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PeopleModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
