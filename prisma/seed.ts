import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const academicLevels = [
    'Class 6',
    'Class 7',
    'JSC',

    'SSC Science',
    'SSC Humanities',
    'SSC Business',

    'HSC Science',
    'HSC Humanities',
    'HSC Business',
  ];

  for (const level of academicLevels) {
    await prisma.academicLevel.upsert({
      where: {
        name: level,
      },
      update: {},
      create: {
        name: level,
      },
    });
  }

  const adminPassword =
  await bcrypt.hash('Admin@123', 10);

await prisma.user.upsert({
  where: {
    phone: '01700000000',
  },
  update: {},
  create: {
    phone: '01700000000',
    password: adminPassword,
    role: 'ADMIN',
    name: 'Super Admin',
  },
});

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });