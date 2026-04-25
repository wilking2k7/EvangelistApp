import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear Administrador
  const admin = await prisma.user.upsert({
    where: { email: 'admin@iglesia.com' },
    update: {},
    create: {
      email: 'admin@iglesia.com',
      name: 'Juan Admin',
      password: 'password123',
      role: 'ADMINISTRADOR',
    },
  });

  // Crear Líder
  const leader = await prisma.user.upsert({
    where: { email: 'lider@iglesia.com' },
    update: {},
    create: {
      email: 'lider@iglesia.com',
      name: 'Carlos Líder',
      password: 'password123',
      role: 'LIDER',
    },
  });

  // Crear Pastor
  const pastor = await prisma.user.upsert({
    where: { email: 'pastor@iglesia.com' },
    update: {},
    create: {
      email: 'pastor@iglesia.com',
      name: 'Andrés Pastor',
      password: 'password123',
      role: 'PASTOR',
    },
  });

  // Crear Persona
  const person = await prisma.person.create({
    data: {
      name: 'Ricardo Amigo',
      type: 'AMIGO',
      status: 'INTERESADO',
      address: 'Calle Falsa 123',
      assignedLeaderId: leader.id,
    },
  });

  // Crear Visita
  const visit = await prisma.visit.create({
    data: {
      date: new Date(),
      location: 'Casa de Ricardo',
      topic: 'El Plan de Salvación',
      personId: person.id,
      leaderId: leader.id,
    },
  });

  // Crear Pregunta Pendiente
  await prisma.question.create({
    data: {
      content: '¿Por qué Dios permite el sufrimiento si es amor?',
      visitId: visit.id,
      isAudited: false,
    },
  });

  await prisma.question.create({
    data: {
      content: '¿Cuál es la diferencia entre bautismo por inmersión y aspersión?',
      visitId: visit.id,
      isAudited: false,
    },
  });

  console.log('Seed with questions completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
