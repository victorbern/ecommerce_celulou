/*
  Warnings:

  - You are about to alter the column `valorAlteracao` on the `AlteracoesEstoque` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `subtotal` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `valorFrete` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `descontoCupom` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `total` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `nota` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,2)`.
  - Added the required column `relevancia` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Made the column `total` on table `Pedido` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nota` on table `Produto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AlteracoesEstoque" ALTER COLUMN "valorAlteracao" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Avaliacao" DROP COLUMN "relevancia",
ADD COLUMN     "relevancia" DECIMAL(3,2) NOT NULL;

-- AlterTable
ALTER TABLE "Pedido" ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "valorFrete" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "descontoCupom" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "total" SET NOT NULL,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "nota" SET NOT NULL,
ALTER COLUMN "nota" SET DATA TYPE DECIMAL(3,2);

-- CreateTable
CREATE TABLE "ClienteHasProdutoFavorito" (
    "codigoProduto" TEXT NOT NULL,
    "codigoCliente" TEXT NOT NULL,

    CONSTRAINT "ClienteHasProdutoFavorito_pkey" PRIMARY KEY ("codigoProduto","codigoCliente")
);

-- AddForeignKey
ALTER TABLE "ClienteHasProdutoFavorito" ADD CONSTRAINT "codigoProduto" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigoProduto") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "ClienteHasProdutoFavorito" ADD CONSTRAINT "codigoCliente" FOREIGN KEY ("codigoCliente") REFERENCES "Cliente"("codigoCliente") ON DELETE RESTRICT ON UPDATE RESTRICT;
