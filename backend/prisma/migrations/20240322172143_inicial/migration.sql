-- CreateTable
CREATE TABLE "Categoria" (
    "codigoCategoria" VARCHAR(12) NOT NULL,
    "nomeCategoria" VARCHAR(45),

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("codigoCategoria")
);

-- CreateTable
CREATE TABLE "Produto" (
    "codigoProduto" VARCHAR(12) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "nomeProduto" VARCHAR(45),
    "descricaoProduto" VARCHAR(45),
    "imagensFolder" VARCHAR(45),
    "nota" DOUBLE PRECISION,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("codigoProduto")
);

-- CreateTable
CREATE TABLE "ProdutoHasCategoria" (
    "codigoProduto" TEXT NOT NULL,
    "codigoCategoria" TEXT NOT NULL,

    CONSTRAINT "ProdutoHasCategoria_pkey" PRIMARY KEY ("codigoProduto","codigoCategoria")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "codigoEstoque" VARCHAR(12) NOT NULL,
    "codigoProduto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("codigoEstoque")
);

-- CreateTable
CREATE TABLE "AlteracoesEstoque" (
    "codigoAlteracao" VARCHAR(12) NOT NULL,
    "valorAlteracao" DOUBLE PRECISION NOT NULL,
    "dataAlteracao" TIMESTAMP(3) NOT NULL,
    "codigoEstoque" TEXT NOT NULL,

    CONSTRAINT "AlteracoesEstoque_pkey" PRIMARY KEY ("codigoAlteracao")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "codigoCliente" VARCHAR(12) NOT NULL,
    "cpfCliente" TEXT NOT NULL,
    "nomeCliente" VARCHAR(45) NOT NULL,
    "celularCliente" VARCHAR(12) NOT NULL,
    "emailCliente" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("codigoCliente")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "codigoEndereco" VARCHAR(12) NOT NULL,
    "cep" VARCHAR(12),
    "nomeRua" VARCHAR(30),
    "numeroCasa" VARCHAR(10),
    "complemento" VARCHAR(30),
    "bairro" VARCHAR(30),
    "cidade" VARCHAR(30) NOT NULL,
    "estado" VARCHAR(30) NOT NULL,
    "codigoCliente" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("codigoEndereco")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "codigoAvaliacao" VARCHAR(12) NOT NULL,
    "titulo" VARCHAR(30),
    "descricao" VARCHAR(120),
    "imagensFolder" VARCHAR(30),
    "relevancia" VARCHAR(5),
    "codigoProduto" TEXT NOT NULL,
    "codigoCliente" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("codigoAvaliacao")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "codigoPedido" VARCHAR(12) NOT NULL,
    "isPago" BOOLEAN NOT NULL,
    "formaPagamento" VARCHAR(30),
    "parcelas" VARCHAR(30),
    "dataPagamento" TIMESTAMP(3),
    "isEntregue" BOOLEAN NOT NULL,
    "dataEntrega" TIMESTAMP(3),
    "subtotal" DOUBLE PRECISION,
    "valorFrete" DOUBLE PRECISION,
    "descontoCupom" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "codigoCliente" TEXT NOT NULL,
    "codigoEndereco" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("codigoPedido")
);

-- CreateTable
CREATE TABLE "PedidoHasProduto" (
    "codigoProduto" TEXT NOT NULL,
    "codigoPedido" TEXT NOT NULL,
    "quantidade" INTEGER,
    "valorUnitario" DECIMAL(10,2),

    CONSTRAINT "PedidoHasProduto_pkey" PRIMARY KEY ("codigoProduto","codigoPedido")
);

-- CreateIndex
CREATE INDEX "codigoCategoria" ON "ProdutoHasCategoria"("codigoCategoria");

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_codigoProduto_key" ON "Estoque"("codigoProduto");

-- CreateIndex
CREATE INDEX "codigoProduto" ON "Estoque"("codigoProduto");

-- CreateIndex
CREATE INDEX "codigoEstoque" ON "AlteracoesEstoque"("codigoEstoque");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpfCliente_key" ON "Cliente"("cpfCliente");

-- CreateIndex
CREATE INDEX "codigoCliente" ON "Endereco"("codigoCliente");

-- AddForeignKey
ALTER TABLE "ProdutoHasCategoria" ADD CONSTRAINT "produto_has_categoria_ibfk_1" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigoProduto") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "ProdutoHasCategoria" ADD CONSTRAINT "produto_has_categoria_ibfk_2" FOREIGN KEY ("codigoCategoria") REFERENCES "Categoria"("codigoCategoria") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "estoque_ibfk_1" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigoProduto") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "AlteracoesEstoque" ADD CONSTRAINT "alteracoes_estoque_ibfk_1" FOREIGN KEY ("codigoEstoque") REFERENCES "Estoque"("codigoEstoque") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "endereco_ibfk_1" FOREIGN KEY ("codigoCliente") REFERENCES "Cliente"("codigoCliente") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "avaliacao_ibfk_1" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigoProduto") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "avaliacao_ibfk_2" FOREIGN KEY ("codigoCliente") REFERENCES "Cliente"("codigoCliente") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "codigoCliente" FOREIGN KEY ("codigoCliente") REFERENCES "Cliente"("codigoCliente") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "codigoEndereco" FOREIGN KEY ("codigoEndereco") REFERENCES "Endereco"("codigoEndereco") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "PedidoHasProduto" ADD CONSTRAINT "codigoProduto" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigoProduto") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "PedidoHasProduto" ADD CONSTRAINT "codigoPedido" FOREIGN KEY ("codigoPedido") REFERENCES "Pedido"("codigoPedido") ON DELETE RESTRICT ON UPDATE RESTRICT;
