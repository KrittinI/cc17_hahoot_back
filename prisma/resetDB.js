require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  await prisma.$executeRawUnsafe("DROP Database cc17_hahoot");
  await prisma.$executeRawUnsafe("CREATE Database cc17_hahoot");
}
console.log("Reset DB..");
run();
