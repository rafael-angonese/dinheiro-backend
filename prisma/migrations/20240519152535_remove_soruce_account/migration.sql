/*
  Warnings:

  - You are about to drop the column `source_account_id` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_source_account_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "source_account_id";
