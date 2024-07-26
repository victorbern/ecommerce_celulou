import { PrismaClient } from "@prisma/client";

async function resetDatabase(prisma: PrismaClient) {
    await prisma.$transaction([
        prisma.alteracoesEstoque.deleteMany(),
        prisma.avaliacao.deleteMany(),
        prisma.categoria.deleteMany(),
        prisma.cliente.deleteMany(),
        prisma.clienteHasProdutoFavorito.deleteMany(),
        prisma.endereco.deleteMany(),
        prisma.estoque.deleteMany(),
        prisma.pedido.deleteMany(),
        prisma.pedidoHasProduto.deleteMany(),
        prisma.produto.deleteMany(),
        prisma.produtoHasCategoria.deleteMany(),
    ]);
}

export { resetDatabase }