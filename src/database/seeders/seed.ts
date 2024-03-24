
import { CategoryType } from '@/constants/category-type';
import { prismaClient } from '@/database/prismaClient';
import { generateHash } from '@/lib/crypto';

async function main() {

  const password = await generateHash('12345678')
  await prismaClient.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Admin PF',
      email: 'admin@admin.com',
      password: password
    },
  })

  await prismaClient.user.upsert({
    where: { email: 'adminpj@adminpj.com' },
    update: {},
    create: {
      name: 'Admin PJ',
      email: 'adminpj@adminpj.com',
      password: password
    },
  })

  await prismaClient.category.createMany({
    data: [
      {
        name: 'Prestação de serviço',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Cashback',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Dividendos',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Rendimento de aplicação financeira',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Resgate de aplicação financeira',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Transferência entre contas',
        type: CategoryType.CREDIT,
      },
    ]
  })

  await prismaClient.category.createMany({
    data: [
      // Moradia
      {
        name: 'Aluguel e/ou escritório/instalações',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Água',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Luz',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Internet',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Conta de celular',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Academia',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Manutenção e reparos',
        type: CategoryType.DEBIT,
      },

      // Transporte
      {
        name: 'Combustível',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Manutenção do veículo',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Uber e/ou Transporte público',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Seguro de carro',
        type: CategoryType.DEBIT,
      },
      {
        name: 'IPVA',
        type: CategoryType.DEBIT,
      },

      // Alimentação
      {
        name: 'Supermercado',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Restaurantes e/ou lanches e cafés',
        type: CategoryType.DEBIT,
      },

      // Saúde
      {
        name: 'Seguro de saúde',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Despesas médicas',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Medicamentos',
        type: CategoryType.DEBIT,
      },

      // Educação
      {
        name: 'Cursos e treinamentos',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Mensalidades escolares',
        type: CategoryType.DEBIT,
      },

      // Entretenimento
      {
        name: 'Assinaturas de streaming',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Cinema, Hobbies e atividades recreativas',
        type: CategoryType.DEBIT,
      },

      // Vestuário
      {
        name: 'Roupas, calçados e acessórios',
        type: CategoryType.DEBIT,
      },

      // Impostos
      {
        name: 'Juros',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Taxas',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Multa',
        type: CategoryType.DEBIT,
      },
      {
        name: 'IRPJ',
        type: CategoryType.DEBIT,
      },
      {
        name: 'DAS (Simples Nacional)',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Guia INSS e IRRF',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Retirada de Pró-labore',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Distribuição de lucro',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Contabilidade',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Transferência entre contas',
        type: CategoryType.DEBIT,
      },
    ]
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