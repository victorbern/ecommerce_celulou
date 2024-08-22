import { describe, it, vi } from "vitest";
import { IClientesRepository } from "../IClientesRepository";
import { IEnderecosRepository } from "../IEnderecosRepository";
import { ICategoriasRepository } from "../ICategoriasRepository";
import { IProdutosRepository } from "../IProdutosRepository";
import { IEstoquesRepository } from "../IEstoquesRepository";
import { IAlteracaoEstoqueRepository } from "../IAlteracaoEstoqueRepository";

const clientesRepositoryMocked = {
    getByCodigoCliente: vi.fn(),
    save: vi.fn(),
    getByCpfCliente: vi.fn(),
    getByEmailCliente: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
}

const enderecosRepositoryMocked = {
    getByCodigoEndereco: vi.fn(),
    getByCodigoCliente: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
}

const categoriasRepositoryMocked = {
    getByName: vi.fn(),
    getAll: vi.fn(),
    getAllWithFilter: vi.fn(),
    getByCodigo: vi.fn(),
    getByCodigoProduto: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
}

const produtosRepositoryMocked = {
    getByCodigo: vi.fn(),
    save: vi.fn(),
    addCategoria: vi.fn(),
    getAll: vi.fn(),
    getByCategorias: vi.fn(),
    update: vi.fn(),
    updateCategorias: vi.fn(),
    updateIsVisivel: vi.fn(),
    updateIsDisponivelCompra: vi.fn(),
    removeCategoria: vi.fn(),
    removeAllCategorias: vi.fn(),
    deleteEstoque: vi.fn(),
    delete: vi.fn(),
}

const estoquesRepositoryMocked = {
    save: vi.fn(),
    getByCodigo: vi.fn(),
    getByProduto: vi.fn(),
    alterarEstoque: vi.fn(),
}

const alteracaoEstoqueRepositoryMocked = {
    save: vi.fn(),
    getByCodigo: vi.fn(),
    delete: vi.fn(),
}

export { clientesRepositoryMocked, enderecosRepositoryMocked, categoriasRepositoryMocked, produtosRepositoryMocked, estoquesRepositoryMocked, alteracaoEstoqueRepositoryMocked }