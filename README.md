
# Projeto de Coleta de Dados Climáticos

## Descrição

Este projeto foi desenvolvido como parte da disciplina de Técnicas Avançadas de Desenvolvimento de Software (TADS). O sistema coleta dados climáticos utilizando a API do OpenWeatherMap e é implementado em Prisma.js, seguindo os princípios do Domain-Driven Design (DDD). E posteriormente foi implementado um segundo serviço para cadastro no sistema de notificação que irá consimur deste serviço de coleta. No projeto atual cada serviço é independente, possuindo seu próprio banco e sendo instanciados em diferentes serviços com docker. Nas melhorias futuras já estão catalogadas a implementação de banco de dados relaiconal com postgresql, inclusive, boa parte do código já está implementada no docker-compose, porém houveram alguns problemas de compatibilidade, e como esse não era o foco no momento, foram efetuadas tarefas com  maior prioridade.

## Estrutura do Projeto

```plaintext
└───DataService
    ├───node_modules
    ├───prisma
    │   └───migrations
    └───src
        ├───errors
        ├───modules
        ├───prisma
        └───routes
└───NewsLetterService
    ├───node_modules
    ├───prisma
    │   └───migrations
    └───src
        ├───errors
        ├───modules
        ├───prisma
        └───routes
```

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/matheus-nantes/TADS.git
   cd TADS
   ```

<br>

2. **Execute os serviços com docker**

- Certifique-se de estar no diretório onde o arquivo "docker-compose.yaml" está, que é o diretório TADS, e então execute o comando:
```bash
 docker-compose up --build --force-recreate
```
- O serviço DataService irá inicar na porta <b>3333</b>, e o serviço NewsLetterService irá iniciar na porta <b>3334</b>.

- *Para garantir que não sejam alocados recursos desnecessários pelo seu docker, exclua recursos inutilizados no docker:
```bash
docker container prune
docker image prune -a
docker volume prune
docker network prune
docker rmi $(docker images -a -q)

docker system df

```


Obs. **Caso tneha curiosidade, execute os serviços individualmente:**
- Para executar apenas o DataService, dirija-se para a pasta DataService com:
```bash
cd DataService
```
- E então execute:
```bash
yarn dev
```
- O serviço irá começar a rodar na porta [3333](http://localhost:3333)

- Para executar apenas o NewsLetterService, dirija-se para a pasta NewsLetterService com:
```bash
cd NewsLetterService
```
- E então execute:
```bash
yarn dev
```
- O serviço irá começar a rodar na porta [3334](http://localhost:3334)


## Rotas da API E DOCUMENTAÇÃO

As rotas da API são definidas em cada `src/routes` de cada diretório de seu respectivo serviçoe mapeiam os endpoints para os serviços e seus respectivos casos de uso.
Para acessar a documentação do serviço DataService, acesse: [localhost:3333/api/docs](http://localhost:3333/api-docs)
Para acessar a documentação do serviço NewsLetterService, acesse: [localhost:3334/api/docs](http://localhost:3334/api-docs)

## Contato

Caso haja qualquer dúvida relacionada ao desenvolvimento do projeto ou organização e estruturação do mesmo, entre em contato comigo por meio dos seguintes canais:

+ Email: nantes.matheus@ufms.br
+ Whatsapp: 67 98472-3254


