# TADS
 Repositório criado para desenvolvimento do exercício prático para a disciplina de TADS/2024.1 ministrada pelo professors Dr. Hudson Silva Borges

 Para o banco de dados será utilizado o ORM Prisma.js

 Para executar o sistema corretamente, primeiramente voce deve fazer o download das dependências do projeto com:
````c
yarn add
````

Com isso, o sistema conseguirá ser executado corretamente.

 Para visualizar o banco de dados, basta encaminhar o terminal para dentro da pasta backend, com o comando:
````c
    cd backend
````

 E então executar:
````c
    yarn prisma studio
````
Com isso será aberta a interface web que o prisma disponibiliza para visualização do banco de dados


Para executar o servidor backend basta rodar:
````c
    yarn dev
````

Com isso o servidor passará a ser executado no endereço "localhost:3333", e tem os seguinte endpoit:  
*Esta documentação rudimentar dos endpoints será aprimorada furutamente por meio de frameworks, é que no momento esta atividade possui média prioridade*

+"/pesquisador": onde é possível executar post, para criar um pesquisador, e get para obter todos os pesquisadores cadastrados. A princípio não foi incluído o parâmetro "senha" pois requer criptografia e outros indicadores de segurança, e como atualmente esta funcionalidade possui baixa prioridade, não foi incluída nesta entrega

+"/localizacao": onde é possivel realizar post para criar novas localizações, e os dados destas localizações são provenientes da resposta da API referente à determinadas coordenadas informadas

+"/condicao": onde é possível executar post para criar novas condições e get para obter todas as condições cadastradas.


 Algumas regras definidas:  
  
+Dados só podem ser inseridos com supervisão de pesquisador, pois deve ser possível rastrear quem autorizou a inserção dos dados

+As temperaturas sempre serão em °C

+Direção do vento é salva em graus, sendo possível obter a direção abstraindo pelo grau.

+No atributo "nuvens" de "CondicaoClimatica" é salvo a porcentagem de nuvens cobrindo o céu naquele instante e local
