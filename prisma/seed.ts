import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("Admin@123!", 12);

  await prisma.user.upsert({
    where: { email: "basharataliofficial76@gmail.com" },
    update: {},
    create: {
      name: "Basharat Ali",
      email: "basharataliofficial76@gmail.com",
      password: hash,
      role: "ADMIN",
    },
  });

  // Seed default SEO for key pages
  const pages = ["home", "services", "about", "portfolio", "contact"];
  for (const page of pages) {
    await prisma.seoMeta.upsert({
      where: { page },
      update: {},
      create: {
        page,
        title: `Siachen Mark — ${page.charAt(0).toUpperCase() + page.slice(1)}`,
        description: "Performance. Growth. Impact. — Siachen Mark builds brands, drives traffic, and turns clicks into customers.",
        robots: "index, follow",
      },
    });
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
