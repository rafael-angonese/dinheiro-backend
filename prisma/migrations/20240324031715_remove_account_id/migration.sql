/*
  Warnings:

  - You are about to drop the column `account_id` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "account_id";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id";
