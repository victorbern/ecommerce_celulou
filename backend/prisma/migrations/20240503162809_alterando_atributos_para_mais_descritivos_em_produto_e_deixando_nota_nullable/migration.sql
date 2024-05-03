/*
  Warnings:

  - You are about to drop the column `altura` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `comprimento` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `largura` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `alturaCM` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comprimentoCM` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `larguraCM` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesoGramas` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "altura",
DROP COLUMN "comprimento",
DROP COLUMN "largura",
DROP COLUMN "peso",
ADD COLUMN     "alturaCM" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "comprimentoCM" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "larguraCM" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "pesoGramas" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "nota" DROP NOT NULL;
