/*
  Warnings:

  - The primary key for the `AlteracoesEstoque` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigoAlteracao` on the `AlteracoesEstoque` table. All the data in the column will be lost.
  - Added the required column `codigoAlteracaoEstoque` to the `AlteracoesEstoque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlteracoesEstoque" DROP CONSTRAINT "AlteracoesEstoque_pkey",
DROP COLUMN "codigoAlteracao",
ADD COLUMN     "codigoAlteracaoEstoque" VARCHAR(12) NOT NULL,
ADD CONSTRAINT "AlteracoesEstoque_pkey" PRIMARY KEY ("codigoAlteracaoEstoque");
