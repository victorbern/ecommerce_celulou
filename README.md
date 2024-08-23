# Ecommerce Celulou
Sistema de ecommerce criado por mim para fins de estudo.

# Documentação da API:
https://victorbern.github.io/ecommerce_celulou/

O caminho para o arquivo da documentação é "./backend/swagger.yml"

# Requisitos:
- Node versão 20.11 ou superior OU Docker instalado na máquina  
Há duas formas diferentes de rodar a aplicação: com o node de sua máquina ou usando docker.  

# Como rodar a aplicação (usando node da própria máquina)
A aplicação ainda está em modo de desenvolvimento, mas caso queira testá-la, siga os seguintes passos:  
1- Clone o repositório em sua máquina  
2- Rode uma instância do postgreSQL na porta 5432 e configure o arquivo /backend/.env com as credenciais do servidor de banco de dados.
3- Caso prefira, deixei uma instância pronta para subir via container. Para usá-la, basta ter o docker instalado em sua máquina e rodar o comando ```docker compose -f docker-compose-bd.yml up -d``` no diretório raiz do projeto  
4- Com o banco rodando, navegue até a pasta backend ```cd backend```  
5- Rode o comando ```npm install``` para instalar as dependências do projeto.  
6- Rode o comando ```npx prisma migrate dev``` para rodar as migrations e deixar o banco pronto para uso.  
7- Por fim, rode o comando ```npm run dev```.  
A partir daí, a aplicação estará funcionando na porta 3000.  

# Como rodar a aplicação (usando apenas docker)  
1- Clone o repositório em sua máquina  
2- Abra o diretório por um terminal e rode o comando ```docker compose up``` (certifique-se de que as portas 3000, 8080 e 5432 estejam disponíveis)  
Caso tudo ocorra bem, é para a aplicação estar disponivel na porta 3000 para requisições  

# Como rodar os testes  
Para rodar os testes, é necessário que você tenha um servidor de postgresql rodando em sua máquina.  
1- Suba um servidor de postgresql e configure o arquivo /backend/.env.test com as credenciais do servidor de banco de dados.  
2- Caso prefira, deixei uma instância pronta para subir via container. Para usá-la, basta ter o docker instalado em sua máquina e rodar o comando ```docker compose -f docker-compose-bd.yml up -d``` no diretório raiz do projeto  
3- Com o banco rodando, navegue até a pasta backend ```cd backend```  
4- Rode o comando ```npm install``` para instalar as dependências do projeto.  
5- Por fim, rode o comando ```npm run test``` para rodar os testes.  
Se tudo der certo, os testes rodarão e mostrarão no console caso algum deles tenha dado erro.  

Caso você tente rodar os testes sem o banco de dados, os testes unitários funcionarão perfeitamente, mas os de integração ficarão com erro.  
