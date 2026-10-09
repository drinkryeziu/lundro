import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const lake = await db.lake.upsert({
    where: { slug: 'lake-norman' },
    update: {},
    create: { slug: 'lake-norman', name: 'Lake Norman', county: 'Mecklenburg' },
  });

  const admin = await db.user.upsert({
    where: { email: 'admin@lundro.test' },
    update: {},
    create: { email: 'admin@lundro.test', name: 'Lundro Admin', role: 'ADMIN' },
  });

  const ownerUser = await db.user.upsert({
    where: { email: 'owner@lundro.test' },
    update: {},
    create: {
      email: 'owner@lundro.test', name: 'Sample Owner', role: 'OWNER',
      owner: { create: { type: 'COMPANY', companyName: 'Norman Boat Co.', verification: 'APPROVED' } },
    },
    include: { owner: true },
  });
  const owner = ownerUser.owner!;

  const renter = await db.user.upsert({
    where: { email: 'renter@lundro.test' },
    update: {},
    create: { email: 'renter@lundro.test', name: 'Sample Renter' },
  });

  const existing = await db.boat.findFirst({ where: { ownerId: owner.id } });
  if (!existing) {
    const boat = await db.boat.create({
      data: {
        ownerId: owner.id, lakeId: lake.id, name: '22ft Pontoon', type: 'PONTOON', capacity: 10,
        halfDayCents: 35000, fullDayCents: 55000, captainAvailable: true,
        startTimes: ['8:00 AM', '1:30 PM'],
        safetyGear: ['Fire extinguisher', 'Throwable flotation device'],
        status: 'ACTIVE',
      },
    });
    const tube = await db.extra.create({ data: { ownerId: owner.id, name: 'Tube', priceCents: 4000 } });
    await db.boatExtra.create({ data: { boatId: boat.id, extraId: tube.id } });
  }
  console.log('Seeded:', { lake: lake.slug, admin: admin.email, owner: ownerUser.email, renter: renter.email });
}

main().finally(() => db.$disconnect());
