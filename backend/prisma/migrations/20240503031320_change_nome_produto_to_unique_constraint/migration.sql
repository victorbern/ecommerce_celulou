/*
  Warnings:

  - A unique constraint covering the columns `[nomeProduto]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "nomeProduto" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Produto_nomeProduto_key" ON "Produto"("nomeProduto");
