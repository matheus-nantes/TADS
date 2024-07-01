
# Projeto de Coleta de Dados Climáticos

## Descrição
Este projeto foi desenvolvido como parte da disciplina de Técnicas Avançadas de Desenvolvimento de Software (TADS). O sistema coleta dados climáticos utilizando a API do OpenWeatherMap e é implementado em Prisma.js, seguindo os princípios do Domain-Driven Design (DDD). E posteriormente foi implementado um segundo serviço para cadastro no sistema de notificação que irá consimur deste serviço de coleta. No projeto atual cada serviço é independente, possuindo seu próprio banco e sendo instanciados em diferentes serviços com docker. Nas melhorias futuras já estão catalogadas a implementação de banco de dados relaiconal com postgresql, inclusive, boa parte do código já está implementada no docker-compose, porém houveram alguns problemas de compatibilidade, e como esse não era o foco no momento, foram efetuadas tarefas com  maior prioridade.


## Estrutura do Projeto
```plaintext
└───APIGateway
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
└───WebSiteUI
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
- Para conseguir acessar os serviços é preciso utilizar o acesso com o Gateway, isso é possível através dos seguintes endereços: <b>http://localhost/data</b> e <b>http://localhost/newsletter/</b>. qualquer acesso fora desse o Gateway irá redirecionar para 404 - Not Found. Internamente os serviços rodam nas postas 3333 e 3334. Era possível acessá-los diretamente, porém, essa abordagem foi removida com a implementação de firewalls que validam as requisições e permitem as providas de algumas origens, como as vindas do Gateway, ou então as de dentr do próprio host. Isso foi implementado pois é uma das práticas de permitir que os serviços permaneçam seguros, bem como, dá o sentido ao Gateway, pois futuramente seria possível implementar uma camada de atutenticação no Gateway, garantido de fato que os dados estejam 100% seguros.

- Você até pode tentar acessar os serviços nos links: localhost:3333 ou localhost:3334, porém, isso não irá funcionar na implementação atual.

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
- O serviço irá começar a rodar na porta [localhost:3333](http://localhost:3333). Porém, de agentes externos só será acessível por meio do Gateway no endereço: [localhost/data](http://localhost/data)

- Para executar apenas o NewsLetterService, dirija-se para a pasta NewsLetterService com:
```bash
cd NewsLetterService
```
- E então execute:
```bash
yarn dev
```
- O serviço irá começar a rodar na porta [localhost:3334](http://localhost:3334). Porém, de agentes externos só será acessível por meio do Gateway no endereço: [localhost/newsletter](http://localhost/newsletter)


# Gateway
Foi implementado o APIGateway com o uso do [NGINX](https://nginx.org/en/). Foi estabelecido um novo serviço no docker-compose que utiliza de uma imagem do nginx. Com isso, foi possível mapear as rotas dos nossos serviços e realizar esse controle.
As requições feitas para '/data' serão redirecionadas para o DataService, que roda na posta 3333 do host.
Já as requisições efetuadas para '/newsletter' serão recirecionadas para o NewsLetterService, que roda na porta 3334 do host.
Forma necessárias aslgumas alterações em toda a estrutura do proejto para que ele se adequasse a nova implementação, mas foram alterações básicas, como estabelecer uma basepath no Swagger, dentre outras que no momento me foge da memória.
Também implementei um "firewall" simples descrito no tópico seguinte.


# Firewall
No server.ts de cada serviço foi implemetnado um código equivalente à um firewall que valida a origem das requisições e autorizma apenas aquelas provenientes do Gateway ou de serviços internos do próprio sistemas, dos containers rodando no docker do host.
Os arquivos server.ts de cada serviço estão nas rotas:
- TADS\DataService\src\server.ts
- NewsLetterService\src\server.ts


## Rotas da API E DOCUMENTAÇÃO
As rotas da API são definidas em cada `src/routes` de cada diretório de seu respectivo serviço mapeiam os endpoints para os serviços e seus respectivos casos de uso. Essas rotas definidas são acessadas através do Gateway. No host o DataService roda an porta 3333 e é acessado no Gateway por '/data', e o NewsLetterService roda na porta 3334 no  host, através do Gateway é acessado com '/newsletter'.
Para acessar a documentação do serviço DataService, acesse: [localhost/data/api-docs](http://localhost/data/api-docs)
Para acessar a documentação do serviço NewsLetterService, acesse: [localhost/newsletter/apidocs](http://localhost/newletter/api-docs)


## Contato
Caso haja qualquer dúvida relacionada ao desenvolvimento do projeto ou organização e estruturação do mesmo, entre em contato comigo por meio dos seguintes canais:

+ Email: nantes.matheus@ufms.br
+ Whatsapp: 67 98472-3254


