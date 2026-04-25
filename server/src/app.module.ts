import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { PeopleModule } from './people/people.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { VisitsModule } from './visits/visits.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PeopleModule,
    DashboardModule,
    UsersModule,
    VisitsModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
