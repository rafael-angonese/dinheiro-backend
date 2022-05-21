-- CreateTable
CREATE TABLE "files_on_transactions" (
    "id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_on_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "files_on_transactions" ADD CONSTRAINT "files_on_transactions_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files_on_transactions" ADD CONSTRAINT "files_on_transactions_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
