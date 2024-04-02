/*
  Warnings:

  - A unique constraint covering the columns `[emailCliente]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cliente_emailCliente_key" ON "Cliente"("emailCliente");
