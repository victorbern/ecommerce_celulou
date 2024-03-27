/*
  Warnings:

  - You are about to drop the column `relevancia` on the `Avaliacao` table. All the data in the column will be lost.
  - Added the required column `nota` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avaliacao" DROP COLUMN "relevancia",
ADD COLUMN     "nota" DECIMAL(3,2) NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "marca" VARCHAR(45);
