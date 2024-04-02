# Ecommerce Celulou
Sistema de ecommerce criado por mim para fins de estudo.

# Como rodar a aplicação
A aplicação ainda está em modo de desenvolvimento, mas caso queira testá-la, siga os seguintes passos:  
1- Clone o repositório em sua máquina  
2- Rode uma instância do postgreSQL na porta 5432  
3- Caso prefira, deixei uma instância pronta para subir via container. Para usá-la, basta ter o docker instalado em sa máquina e rodar o comando ```docker compose up``` no diretório raiz do projeto  
4- Com o banco rodando, navegue até a pasta backend ```cd backend```  
5- Insira o comando ```npm run dev```  
A partir daí, a aplicação estará funcionando na porta 3000.  
Com o desenvolver do projeto, pretendo deixá-lo disponível inteiramente usando Docker.  

# Como rodar os testes
Para rodar os testes unitários, repita os passos acima até o passo número 4 e insira o comando ```npm test``` ao invés de ```npm run dev``` 
