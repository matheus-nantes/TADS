
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

### Domínios

1. **Condição Climática (`condicaoClimatica`)**
   - **Entidade:** `CondicaoClimatica`
   - **Repositório:** `src/modules/condicaoClimatica/useCases`
   - **DTOs:** `src/modules/condicaoClimatica/dtos/CreateCondicaoClimaticaDTO.ts`
   - **Casos de Uso:**
     - `createCondicaoClimatica`
       - `CreateCondicaoClimaticaController.ts`
       - `CreateCondicaoClimaticaUseCase.ts`
     - `getCondicaoClimatica`
       - `GetCondicaoClimaticaController.ts`
       - `GetCondicaoClimaticaUseCase.ts`

2. **Localização (`localizacao`)**
   - **Entidade:** `Localizacao`
   - **Repositório:** `src/modules/localizacao/useCases`
   - **DTOs:** `src/modules/localizacao/dtos/CreateLocalizacaoDTO.ts`
   - **Casos de Uso:**
     - `createLocalizacao`
       - `CreateLocalizacaoController.ts`
       - `CreateLocalizacaoUseCase.ts`

3. **Pesquisador (`pesquisador`)**
   - **Entidade:** `Pesquisador`
   - **Repositório:** `src/modules/pesquisador/useCases`
   - **DTOs:** `src/modules/pesquisador/dtos/CreatePesquisadorDTO.ts`
   - **Casos de Uso:**
     - `createPesquisador`
       - `CreatePesquisadorController.ts`
       - `CreatePesquisadorUseCase.ts`
     - `getPesquisadores`
       - `GetPesquisadorController.ts`
       - `GetPesquisadoresUseCase.ts`

### Regras de Negócio

As regras de negócio estão contidas nos casos de uso de cada módulo, seguindo o princípio de que a lógica deve ser encapsulada e gerida pelos próprios domínios.

### Configuração do Prisma

A pasta `prisma` contém a configuração do Prisma e as migrações do banco de dados. As migrações refletem a evolução do schema ao longo do desenvolvimento.

## Rotas da API

As rotas da API são definidas em `src/routes` e mapeiam os endpoints para os serviços e seus respectivos casos de uso.

## Contribuição

Contribuições são bem-vindas! Por favor, siga o fluxo padrão de GitHub para pull requests.

1. Fork o projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Add nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.


