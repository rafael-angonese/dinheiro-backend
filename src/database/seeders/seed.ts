
import { prismaClient } from '@/database/prismaClient';
import { generateHash } from '@/lib/crypto';

async function main() {

  const password = await generateHash('12345678')
  const adminUser = await prismaClient.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@admin.com',
      role: 'admin',
      password: password
    },
  })

  await prismaClient.account.create({
    data: {
      name: 'Planegazers',
      description: 'conta PJ',
      userId: adminUser.id,
      bankAccounts: {
        createMany: {
          data: [
            {
              name: 'Nubank',
              balance: 0,
              userId: adminUser.id
            },
            {
              name: 'Inter',
              balance: 0,
              userId: adminUser.id
            }
          ]
        }
      }
    }
  })

  await prismaClient.account.create({
    data: {
      name: 'Rafael Angonese',
      description: 'conta PF',
      userId: adminUser.id,
      bankAccounts: {
        createMany: {
          data: [
            {
              name: 'Nubank',
              balance: 0,
              userId: adminUser.id
            },
            {
              name: 'Inter',
              balance: 0,
              userId: adminUser.id
            }
          ]
        }
      }
    }
  })

  console.log('seeders run successful ✅')
}
main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    console.log('run seeders error ❌')
    await prismaClient.$disconnect()
    process.exit(1)
  })