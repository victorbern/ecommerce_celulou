-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "endereco_ibfk_1";

-- DropForeignKey
ALTER TABLE "ProdutoHasCategoria" DROP CONSTRAINT "produto_has_categoria_ibfk_2";

-- AddForeignKey
ALTER TABLE "ProdutoHasCategoria" ADD CONSTRAINT "produto_has_categoria_ibfk_2" FOREIGN KEY ("codigoCategoria") REFERENCES "Categoria"("codigoCategoria") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "endereco_ibfk_1" FOREIGN KEY ("codigoCliente") REFERENCES "Cliente"("codigoCliente") ON DELETE CASCADE ON UPDATE RESTRICT;
