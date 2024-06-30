/*
  Warnings:

  - You are about to drop the column `codigoCliente` on the `Avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `codigoCliente` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `codigoEndereco` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `cpfCliente` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataAvaliacao` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeCliente` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpfCliente` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dadosEndereco` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeCliente` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Avaliacao" DROP CONSTRAINT "avaliacao_ibfk_2";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "codigoCliente";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "codigoEndereco";

-- AlterTable
ALTER TABLE "Avaliacao" DROP COLUMN "codigoCliente",
ADD COLUMN     "cpfCliente" TEXT NOT NULL,
ADD COLUMN     "dataAvaliacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nomeCliente" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "codigoCliente",
DROP COLUMN "codigoEndereco",
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cpfCliente" TEXT NOT NULL,
ADD COLUMN     "dadosEndereco" TEXT NOT NULL,
ADD COLUMN     "nomeCliente" TEXT NOT NULL;
