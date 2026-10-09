import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth-hash';

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
    create: { email: 'admin@lundro.test', name: 'Lundro Admin', role: 'ADMIN', passwordHash: hashPassword('lundro-demo-1') },
  });

  const ownerUser = await db.user.upsert({
    where: { email: 'owner@lundro.test' },
    update: {},
    create: {
      email: 'owner@lundro.test', name: 'Sample Owner', role: 'OWNER', passwordHash: hashPassword('lundro-demo-1'),
      owner: { create: { type: 'COMPANY', companyName: 'Norman Boat Co.', verification: 'APPROVED' } },
    },
    include: { owner: true },
  });
  const owner = ownerUser.owner!;

  const renter = await db.user.upsert({
    where: { email: 'renter@lundro.test' },
    update: {},
    create: { email: 'renter@lundro.test', name: 'Sample Renter', passwordHash: hashPassword('lundro-demo-1') },
  });

  const TYPE: Record<string, 'PONTOON' | 'SKI_WAKE' | 'CENTER_CONSOLE' | 'SAILBOAT' | 'JET_SKI'> =
    { pontoon: 'PONTOON', ski: 'SKI_WAKE', center: 'CENTER_CONSOLE', sail: 'SAILBOAT', jet: 'JET_SKI' };
  // [id, title, area, guests, half, full, rating, reviews, captain, self, instant, extras, type, dist, x, y, palette, accent]
  const rows: (string | number | null)[][] = [
      ['b1', "24' Bennington Pontoon", 'Cornelius', 12, 350, 600, 4.9, 38, 1, 1, 1, 'tube sup mat cooler speaker', 'pontoon', 3.1, 60, 66, 'midday', '#0A6C7A'],
      ['b2', "22' MasterCraft XT22", 'Mooresville', 14, 525, 950, 4.8, 21, 1, 1, 1, 'tube wake skis speaker cooler', 'ski', 12.4, 70, 23, 'clear', '#C2410C'],
      ['b3', "25' Sun Tracker Party Barge", 'Davidson', 13, 395, 700, null, 0, 1, 1, 0, 'tube cooler speaker mat', 'pontoon', 6.0, 65, 54, 'morning', '#0F2A3D'],
      ['b4', "23' Barletta Tritoon", 'Huntersville', 12, 450, 800, 5.0, 12, 1, 0, 1, 'tube cooler speaker sup', 'pontoon', 4.2, 62, 81, 'golden', '#0A6C7A'],
      ['b5', "21' Malibu Wakesetter", 'Mooresville', 12, 560, 1000, 4.7, 44, 1, 0, 0, 'wake skis tube speaker', 'ski', 9.8, 57, 40, 'clear', '#0F2A3D'],
      ['b6', "20' Bennington S Pontoon", 'Denver', 10, 295, 520, 4.6, 9, 1, 1, 0, 'tube cooler fishing', 'pontoon', 7.5, 37, 63, 'morning', '#C2410C'],
      ['b7', "26' Harris Grand Mariner", 'Cornelius', 14, 575, 1050, 4.9, 63, 1, 0, 1, 'tube mat cooler speaker sup', 'pontoon', 2.6, 55, 71, 'golden', '#C2410C'],
      ['b8', "24' Avalon Catalina", 'Sherrills Ford', 12, 375, 650, null, 0, 1, 1, 0, 'tube cooler', 'pontoon', 14.0, 31, 26, 'midday', '#0F2A3D'],
      ['b9', "19' Yamaha AR190", 'Cornelius', 8, 340, 600, 4.8, 27, 0, 1, 1, 'tube wake skis', 'ski', 3.5, 66, 61, 'clear', '#C2410C'],
      ['b10', 'Sea-Doo GTX jet ski', 'Mooresville', 3, 180, 320, 4.5, 16, 0, 1, 1, '', 'jet', 11.0, 66, 30, 'morning', '#0A6C7A'],
      ['b11', "22' Sea Hunt Ultra 225", 'Huntersville', 9, 410, 720, 4.4, 8, 1, 1, 0, 'fishing cooler tube', 'center', 5.0, 58, 78, 'midday', '#0F2A3D'],
      ['b12', 'Catalina 25 sailboat', 'Davidson', 6, 300, 520, 4.9, 11, 1, 0, 0, 'cooler', 'sail', 6.4, 61, 49, 'golden', '#0A6C7A'],
      ['b13', "22' Sun Tracker Fishin' Barge", 'Denver', 8, 260, 450, 4.3, 19, 0, 1, 0, 'fishing cooler', 'pontoon', 8.1, 41, 58, 'morning', '#0F2A3D'],
      ['b14', "25' Bennington QX", 'Cornelius', 12, 650, 1150, 5.0, 7, 1, 0, 1, 'tube sup mat cooler speaker', 'pontoon', 2.9, 58, 67, 'clear', '#0A6C7A']
  ];
  for (const r of rows) {
    const [id, name, area, cap, half, full, rating, reviews, captain, self, instant, extras, type, dist, x, y, palette, accent] = r as any[];
    const data = {
      name, area, capacity: cap, halfDayCents: half * 100, fullDayCents: full * 100, ratingAvg: rating, reviewCount: reviews,
      captainAvailable: !!captain, selfDrive: !!self, instantBook: !!instant, amenities: extras ? extras.split(' ') : [],
      type: TYPE[type], startTimes: ['9:00 AM', '1:30 PM'], status: 'ACTIVE' as const,
      listingMeta: { dist, x, y, palette, accent },
    };
    await db.boat.upsert({
      where: { id },
      update: data,
      create: { id, ownerId: owner.id, lakeId: lake.id, ...data },
    });
  }
  console.log('Seeded:', { lake: lake.slug, admin: admin.email, owner: ownerUser.email, renter: renter.email });
}

main().finally(() => db.$disconnect());
