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
      password: 'password123', // En producción usar hashing
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

  // Crear Personas de ejemplo
  await prisma.person.create({
    data: {
      name: 'Ricardo Amigo',
      type: 'AMIGO',
      status: 'INTERESADO',
      address: 'Calle Falsa 123',
      assignedLeaderId: leader.id,
    },
  });

  await prisma.person.create({
    data: {
      name: 'Marta Hermana',
      type: 'HERMANO',
      status: 'BAUTIZADO',
      address: 'Av. Siempre Viva 742',
      assignedLeaderId: leader.id,
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
