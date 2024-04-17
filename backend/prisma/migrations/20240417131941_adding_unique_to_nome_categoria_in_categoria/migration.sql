/*
  Warnings:

  - A unique constraint covering the columns `[nomeCategoria]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nomeCategoria` on table `Categoria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "nomeCategoria" SET NOT NULL,
ALTER COLUMN "nomeCategoria" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nomeCategoria_key" ON "Categoria"("nomeCategoria");
