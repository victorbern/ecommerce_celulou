/*
  Warnings:

  - Added the required column `isAdmin` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDisponivelCompra` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVisivel` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "isDisponivelCompra" BOOLEAN NOT NULL,
ADD COLUMN     "isVisivel" BOOLEAN NOT NULL;
