
# Projeto de Coleta de Dados Climáticos

## Descrição

Este projeto foi desenvolvido como parte da disciplina de Técnicas Avançadas de Desenvolvimento de Software (TADS). O sistema coleta dados climáticos utilizando a API do OpenWeatherMap e é implementado em Prisma.js, seguindo os princípios do Domain-Driven Design (DDD).

## Estrutura do Projeto

```plaintext
└───backend
    ├───node_modules
    ├───prisma
    │   └───migrations
    └───src
        ├───errors
        ├───modules
        │   ├───condicaoClimatica
        │   │   ├───dtos
        │   │   │   └───CreateCondicaoClimaticaDTO.ts
        │   │   └───useCases
        │   │       ├───createCondicaoClimatica
        │   │       │   ├───CreateCondicaoClimaticaController.ts
        │   │       │   └───CreateCondicaoClimaticaUseCase.ts
        │   │       └───getCondicaoClimatica
        │   │           ├───GetCondicaoClimaticaController.ts
        │   │           └───GetCondicaoClimaticaUseCase.ts
        │   ├───localizacao
        │   │   ├───dtos
        │   │   │   └───CreateLocalizacaoDTO.ts
        │   │   └───useCases
        │   │       └───createLocalizacao
        │   │           ├───CreateLocalizacaoController.ts
        │   │           └───CreateLocalizacaoUseCase.ts
        │   └───pesquisador
        │       ├───dtos
        │       │   └───CreatePesquisadorDTO.ts
        │       └───useCases
        │           ├───createPesquisador
        │           │   ├───CreatePesquisadorController.ts
        │           │   └───CreatePesquisadorUseCase.ts
        │           └───getPesquisadores
        │               ├───GetPesquisadorController.ts
        │               └───GetPesquisadoresUseCase.ts
        ├───prisma
        └───routes
```

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/matheus-nantes/TADS.git
   cd backend
   ```
<div style="font-size: 0.8em;padding-left:50px;">
 Não se esqueça de alterar o diretório no terminal para a pasta TADS/backend, pois é aonde o código da aplicação está.
 <div style="font-size: 1.2em;margin-left:60px;background-color:#eeeeee">
 cd TADS/backend
 </div>
</div>

<br>

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados com Prisma:**
   - Configure o arquivo `.env` com as credenciais do seu banco de dados.
   - Execute as migrações:
     ```bash
     npx prisma migrate dev
     ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## Estrutura do Projeto em DDD

O projeto foi organizado conforme os princípios do Domain-Driven Design (DDD). Abaixo está o mapeamento dos elementos de DDD:

No meu projeto, cada ``entidade`` foi mapeada em um ``seviço`` diferente, com seus respectivos ``casos de uso`` mapeados, logo:

1. **Condição Climática (`condicaoClimatica`)**
   - **Entidade:** `CondicaoClimatica`
   - **Endpoint do serviço:** `localhost:3333/condicao`
   - **DTO:** `src/modules/condicaoClimatica/dtos/CreateCondicaoClimaticaDTO.ts`
   - **Casos de Uso:**
     - `createCondicaoClimatica`
       - `CreateCondicaoClimaticaController.ts`
       - `CreateCondicaoClimaticaUseCase.ts`
     - `getCondicaoClimatica`
       - `GetCondicaoClimaticaController.ts`
       - `GetCondicaoClimaticaUseCase.ts`

2. **Pesquisador (`pesquisador`)**
   - **Entidade:** `Pesquisador`
   - **Endpoint do serviço:** `localhost:3333/pesquisador`
   - **DTO:** `src/modules/pesquisador/dtos/CreatePesquisadorDTO.ts`
   - **Casos de Uso:**
     - `createPesquisador`
       - `CreatePesquisadorController.ts`
       - `CreatePesquisadorUseCase.ts`
     - `getPesquisadores`
       - `GetPesquisadorController.ts`
       - `GetPesquisadoresUseCase.ts`

O **repositório** do meu sistema, definido no documento da atividade "Projeto de software usando DDD para coleta de dados climáticos" como "Base de dados climáticos", seria o próprio Prisma. O Prisma oferece uma abstração ao acesso e manipulação ao acesso aos dados, e age como uma camada entre a camada de negócios e a de dados, oferecendo métodos como pesquisador.create, pesquisador.findUnique, pesquisador.save, pesquisador.delete, etc. Ele abstrai a criação de queries e a manipulação direta do banco de dados através de funções e métodos pré-definidos. Além disso, mudar de uma base de dados relacional para não relacional exigirá apenas ajustes nos arquivos de configuração do Prisma, sem afetar as entidades ou serviços.
> <div style="font-size: 0.8em;">Admito que fiquei com certa dúvida ao definir exatamente o repositório, pois pois os "UseCases" de cada entidade, ex: "src/modules/condicaoClimatica/createCaondicaoClimatica/CreateCondicaoClimaticaUseCase.ts", também podem ser considerados repositórios ao meu ver, pois realizam um processo de abstração entre camada de negócio e acesso ao dados, porém, ele realiza esse acesso aos dados por meio do prisma, que também pode ser considerado um repositório, então resolvi unificar essa definição apenas ao prisma, mas caso eu esteja equivocado, quero ressaltar que existem ambas possibilidades que estão sendo mapeadas em meu projeto.</div>


### Regras de Negócio

As regras de negócio estão contidas nos casos de uso de cada módulo, seguindo o princípio de que a lógica deve ser encapsulada e gerida pelos próprios domínios.
- Por exemplo, na versão atual do projeto, o cpf do pesquisador responsável pela "ordem" de coleta de dados já está incluído na entidade condicaoClimática, pois assim, já é possível implementar o sistema de login no sistema em novas sprint's. Pois assim, além de possibilitar a rastreabilidade das coletas, quem solicitou o quê, por exemplo, caso sejam adotadas requisições pagas futuramente, bem como será possível restringir o acesso aos dados, caso seja necessário.
- O nome do local retornado pela OpenWeatherMap, junto com o país, separado por hífen, são inclusos na entidade coletaClimática para possibilidade de implementação de filtros mais restritos em versões futuras.


### Configuração do Prisma

A pasta `prisma` contém a configuração do Prisma e as migrações do banco de dados. As migrações refletem a evolução do schema ao longo do desenvolvimento.

## Rotas da API E DOCUMENTAÇÃO

As rotas da API são definidas em `src/routes` e mapeiam os endpoints para os serviços e seus respectivos casos de uso.
Para acessar a documentação dos serviços, acesse: [localhost:3333/api/docs](http://localhost:3333/api-docs)

## Contato

Caso haja qualquer dúvida relacionada ao desenvolvimento do projeto ou organização e estruturação do mesmo, entre em contato comigo por meio dos seguintes canais:

+ Email: nantes.matheus@ufms.br
+ Whatsapp: 67 98472-3254


