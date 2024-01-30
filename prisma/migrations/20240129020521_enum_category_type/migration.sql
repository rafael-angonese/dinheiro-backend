/*
  Warnings:

  - The `type` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('CREDIT', 'DEBIT');

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "type",
ADD COLUMN     "type" "CategoryType" NOT NULL DEFAULT E'CREDIT';
