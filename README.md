# TADS
Repositório criado para desenvolvimento do exercício prático para a disciplina de TADS/2024.1 ministrada pelo professors Dr. Hudson Silva Borges

Para o banco de dados será utilizado o ORM Prisma.js

para executar o sistema corretamente, primeiramente voce deve fazer o download das dependências do projeto com:
````c
yarn add
````

Com isso, o sistema conseguirá ser executado corretamente.

Para visualizar o banco de dados, basta encaminhar o terminal para dentro da pasta backend, com o comando:
````c
    cd backend
````

e então executar:
````c
    yarn prisma studio
````

com isso será aberta a interface web que o prisma disponibiliza para visualização do banco de dados

algumas regras definidas:
dados só podem ser inseridos com supervisão de pesuisador, pois deve ser possível rastrear quem autorizou a inserção dos dados

as temperaturas sempre serão em °C

direção do vento é salva em graus, sendo possível obter a direção abstraindo pelo grau.

em nuvens é salvo a porcentagem de nuvens cobrindo o céu
