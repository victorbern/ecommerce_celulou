import { describe, expect, test } from "vitest";
import { Produto } from "./Produto";

describe("Testando a entidade Produto", () => {
    test("Deve ser possível criar um objeto de produto", () => {
        expect(new Produto({
            codigoProduto: "PAABBBCCCDDD",
            valor: 10.45,
            nomeProduto: "Redmi Note 12",
            marca: "Xiaomi",
            descricaoProduto:
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised in 
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.`,
            imagensFolder: "PAABBBCCCDDD/",
            nota: 4.20,
            pesoGramas: 300.00,
            alturaCM: 20.20,
            larguraCM: 30.10,
            comprimentoCM: 12.00
        })).satisfies

        // Testando pois deve ser possível criar com valor igual a zero
        expect(new Produto({
            codigoProduto: "PAABBBCCCDDD",
            valor: 0,
            nomeProduto: "Redmi Note 12",
            marca: "Xiaomi",
            descricaoProduto:
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised in 
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.`,
            imagensFolder: "PAABBBCCCDDD/",
            nota: 4.20,
            pesoGramas: 300.00,
            alturaCM: 20.20,
            larguraCM: 30.10,
            comprimentoCM: 12.00
        }))

        // Deve ser possível criar um produto com uma nota nula
        expect(new Produto({
            codigoProduto: "PAABBBCCCDDD",
            valor: 10.45,
            nomeProduto: "Redmi Note 12",
            marca: "Xiaomi",
            descricaoProduto:
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised in 
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.`,
            imagensFolder: "PAABBBCCCDDD/",
            nota: null,
            pesoGramas: 300.00,
            alturaCM: 20.20,
            larguraCM: 30.10,
            comprimentoCM: 12.00
        })).satisfies  
    });

    describe("Testando o código do produto", () => {
        test("Não deve ser possivel criar um objeto de Produto com o código com uma quantidade de caracteres diferente de 12", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "",
                    valor: 10.45,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                });
            }).toThrow("O tamanho do código precisa ser de 12 caracteres");
    
            expect(() => {
                new Produto({
                    codigoProduto: "ABC",
                    valor: 10.45,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O tamanho do código precisa ser de 12 caracteres")
        });
    
        test("Não deve ser possível criar um objeto de Produto com o código de um tipo diferente de string", () => {
            expect(() => {
                new Produto({
                    codigoProduto: null,
                    valor: 10.45,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O código precisa ser uma string");
        });    
    })

    describe("Testando o valor do produto", () => {
        test("Não deve ser possível criar um objeto de Produto com um valor com um tipo diferente de número", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: null,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O valor precisa ser um numero");
        })
    
        test("Não deve ser possível criar um objeto de Produto com um valor abaixo de zero", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: -2,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O valor precisa ser maior ou igual a zero")
        })
    
        test("Não deve ser possível criar um objeto de Produto com um valor com mais de 8 digitos inteiros", () => {     
            // Tentando criar um valor com mais de 8 digitos inteiros
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 1000000000,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O valor deve possuir até 10 digitos, sendo 2 deles decimais")
        });
    
        test("Não deve ser possível criar um objeto de Produto com um valor com mais de 2 digitos decimais", () => {
            
            // Tentando criar um valor com mais de dois digitos decimais
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.001,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O valor deve possuir até 10 digitos, sendo 2 deles decimais")
        })
    })

    describe("Testando o nome do produto", () => {
        test("Não deve ser possível criar um objeto de Produto com um nome vazio", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("É necessário inserir um nome para o produto")
        });
    
        test("Não deve ser possível criar um objeto de Produto com um nome diferente de string", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: null,
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O nome do produto precisa ser uma string")
        });
    
        test("Não deve ser possível criar um objeto de Produto com um nome com mais de 45 caracteres", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12 4GB RAM 64GB 4G - Smartphone Xioami 2023",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O nome do produto não deve ter mais do que 45 caracteres")
        })
    })

    describe("Testando a marca do produto", () => {
        test("Não deve ser possível criar um objeto de Produto com uma marca vazia", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("É necessário inserir uma marca")
        });

        test("Não deve ser possível criar um objeto de Produto com uma marca diferente de string", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: null,
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A marca precisa ser uma string")
        })

        test("Não deve ser possível criar um objeto de Produto com uma marca com mais de 45 caracteres", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi LTDA - Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A marca não deve possuir mais do que 45 caracteres")
        })
    })

    describe("Testando a descrição do produto", () => {
        test("Não deve ser possível criar um objeto de Produto com uma descrição diferente de string", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto: null,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A descrição precisa ser uma string")
        })
    })

    describe("Testando o imagensFolder de produto", () => {
        test("Não deve ser possível criar um objeto de Produto com um imagensFolder diferente de string", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: null,
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A imagensFolder precisa ser uma string")
        })

        test("Não deve ser possível criar um objeto de Produto com um imagensFolder com mais de 45 caracteres", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/SAKSJDSKAJDHSAHDASHJAASKAJSASJKASAS",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O imagensFolder não pode ter mais do que 45 caracteres")
        })
    })

    describe("Testando a nota do produto", () => {
        test("Não deve ser possível criar um objeto de Produto com uma nota abaixo de zero", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: -2,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A nota deve ser maior ou igual a zero")
        })

        test("Não deve ser possível criar um objeto de Produto com uma nota com mais de um digito inteiro", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 42.2,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A nota deve possuir até 3 digitos, sendo 2 deles decimais")
        })

        test("Não deve ser possível criar um objeto de Produto com uma nota com mais de 2 digitos decimais", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.222,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A nota deve possuir até 3 digitos, sendo 2 deles decimais")
        })
    })

    describe("Testando o peso de produto", () => {
        test("Não deve ser possível criar um objeto de Produto com um peso com um tipo diferente de número", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: null,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O peso deve ser um número")
        })

        test("Não deve ser possível criar um objeto de Produto com um peso menor que zero", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: -2,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O peso deve ser maior ou igual a zero")
        })

        test("Não deve ser possível criar um objeto de Produto com um peso com mais de 4 digitos inteiros", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 30000.0,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O peso deve possuir até 6 digitos, sendo 2 deles decimais")
        })

        test("Não deve ser possível criar um objeto de Produto com um peso com mais de 2 digitos decimais", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 30.002,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("O peso deve possuir até 6 digitos, sendo 2 deles decimais")
        })
    })

    describe("Testando a altura de produto", () => {
        test("Não deve ser possível criar um objeto de Produto com uma altura com um tipo diferente de número", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: null,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A altura deve ser um número")
        })

        test("Não deve ser possível criar um objeto de Produto com uma altura menor do que zero", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: -20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A altura deve ser maior ou igual a zero")
        })

        test("Não deve ser possível criar um objeto de Produto com uma altura com mais de 2 digitos inteiros", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 203.2,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A altura deve possuir até 4 digitos, sendo 2 deles decimais")
        })

        test("Não deve ser possível criar um objeto de Produto com uma altura com mais de 2 digitos decimais", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 2.209,
                    larguraCM: 30.10,
                    comprimentoCM: 12.00
                })
            }).toThrow("A altura deve possuir até 4 digitos, sendo 2 deles decimais")
        })
    })

    describe("Testando a largura de produto", () => {
        test("Não deve ser possível criar um objeto de Produto com uma largura com o tipo diferente de número", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: null,
                    comprimentoCM: 12.00
                })
            }).toThrow("A largura deve ser um número")
        })

        test("Não deve ser possível criar um objeto de Produto com uma largura menor do que zero", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: -20.20,
                    comprimentoCM: 12.00
                })
            }).toThrow("A largura deve ser maior ou igual a zero")
        })

        test("Não deve ser possível criar um objeto de Produto com uma largura com mais de 2 digitos inteiros", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 303.1,
                    comprimentoCM: 12.00
                })
            }).toThrow("A largura deve possuir até 4 digitos, sendo 2 deles decimais")
        })

        test("Não deve ser possível criar um objeto de Produto com uma largura com mais de 2 digitos decimais", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 3.109,
                    comprimentoCM: 12.00
                })
            }).toThrow("A largura deve possuir até 4 digitos, sendo 2 deles decimais")
        })
    })

    describe("Testando o comprimento de produto", () => {
        test("Não deve ser possível criar um objeto de Produto com um comprimento com um tipo diferente de número", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: null
                })
            }).toThrow("O comprimento deve ser um número")
        })

        test("Não deve ser possível criar um objeto de Produto com um comprimento menor do que zero", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: -12.00
                })
            }).toThrow("O comprimento deve ser maior ou igual a zero")
        })

        test("Não deve ser possível criar um objeto de Produto com um comprimento com mais de 2 digitos inteiros", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 122.0
                });
            }).toThrow("O comprimento deve possuir até 4 digitos, sendo 2 deles decimais");
        });

        test("Não deve ser possível criar um objeto de Produto com um comprimento com mais de 2 digitos decimais", () => {
            expect(() => {
                new Produto({
                    codigoProduto: "PAABBBCCCDDD",
                    valor: 10.01,
                    nomeProduto: "Redmi Note 12",
                    marca: "Xiaomi",
                    descricaoProduto:
                        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in 
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.`,
                    imagensFolder: "PAABBBCCCDDD/",
                    nota: 4.20,
                    pesoGramas: 300.00,
                    alturaCM: 20.20,
                    larguraCM: 30.10,
                    comprimentoCM: 1.002
                });
            }).toThrow("O comprimento deve possuir até 4 digitos, sendo 2 deles decimais")
        })
    })
    
})