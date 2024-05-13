# Ecommerce Celulou
Sistema de ecommerce criado por mim para fins de estudo.

# Requisitos:
- Node versão 20.11 ou superior OU Docker instalado na máquina  
Há duas formas diferentes de rodar a aplicação: com o node de sua máquina ou usando docker.  

# Como rodar a aplicação (usando node da própria máquina)
A aplicação ainda está em modo de desenvolvimento, mas caso queira testá-la, siga os seguintes passos:  
1- Clone o repositório em sua máquina  
2- Rode uma instância do postgreSQL na porta 5432  
3- Caso prefira, deixei uma instância pronta para subir via container. Para usá-la, basta ter o docker instalado em sua máquina e rodar o comando ```docker compose -f docker-compose-bd.yml up -d``` no diretório raiz do projeto  
4- Com o banco rodando, navegue até a pasta backend ```cd backend```  
5- Rode o comando ```npx prisma migrate dev``` para rodar as migrations e deixar o banco pronto para uso.
6- Por fim, insira o comando ```npm run dev```.
A partir daí, a aplicação estará funcionando na porta 3000.  

# Como rodar a aplicação (usando apenas docker)  
1- Clone o repositório em sua máquina  
2- Abra o diretório por um terminal e rode o comando ```docker compose up``` (certifique-se de que as portas 3000, 8080 e 5432 estejam disponíveis)  
Caso tudo ocorra bem, é para a aplicação estar disponivel na porta 3000 para requisições  

# Como rodar os testes
Para rodar os testes unitários, você deverá rodar com o node de sua máquina. O comando para rodar os testes unitários é ```npm test``` ao invés de ```npm run dev``` 
