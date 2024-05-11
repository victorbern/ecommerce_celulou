/*
  Warnings:

  - A unique constraint covering the columns `[nomeEndereco]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Avaliacao" ALTER COLUMN "titulo" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "nomeEndereco" TEXT;

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "marca" SET DATA TYPE VARCHAR(60);

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_nomeEndereco_key" ON "Endereco"("nomeEndereco");
