/*
  Warnings:

  - You are about to drop the column `medidasLAC` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `altura` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comprimento` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `largura` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "medidasLAC",
ADD COLUMN     "altura" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "comprimento" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "largura" DECIMAL(10,2) NOT NULL;
