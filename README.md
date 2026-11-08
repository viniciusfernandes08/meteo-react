# Meteo React

Aplicação simples de consulta meteorológica por cidade, desenvolvida como
projeto de teste com Next.js, React e TypeScript.

## Overview

O usuário informa o nome de uma cidade e a aplicação:

1. Obtém as coordenadas da cidade.
2. Consulta os dados meteorológicos dessas coordenadas.
3. Exibe as condições atuais, ou uma mensagem de erro quando a consulta não
   pode ser concluída.

As requisições para a OpenWeather são feitas pelas rotas de API do Next.js,
mantendo a chave da API no servidor.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- OpenWeather Geocoding API e Weather API
- Lucide React

## Arquitetura

O código principal está organizado por feature, aplicando clean arch com separação entre domínio,
casos de uso, infraestrutura e interface de usuário:

```text
src/
├── app/
│   ├── api/
│   │   ├── coordinates/[city]/   # Busca coordenadas da cidade
│   │   └── weather/              # Busca dados meteorológicos
│   ├── layout.tsx
│   └── page.tsx
└── features/
    └── dashboard/
        ├── application/usecases/  # Regras de aplicação
        ├── domain/                # Entidades, erros e contratos
        ├── infra/                 # DTOs, mappers e repositório
        └── ui/                    # Componentes, hook e validação
```

O fluxo da busca é:

```text
Formulário
  -> useSearchCity
  -> getCityWeatherUseCase
  -> repositório do dashboard
  -> rotas internas da API
  -> OpenWeather
```

## Configuração

### Pré-requisitos

- Node.js
- npm
- Uma chave de API da [OpenWeather](https://openweathermap.org/api)

Crie um arquivo `.env.local` ou `.env` na raiz do projeto:

```env
OPENWEATHER_API_KEY=sua_chave
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
OPENWEATHER_GEOCODING_BASE_URL=https://api.openweathermap.org/geo/1.0
```

## Instalação e execução

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

```bash
npm run dev    # Inicia o ambiente de desenvolvimento
npm run build  # Gera a build de produção
npm run start  # Inicia a aplicação em produção
```

## Rotas de API

### `GET /api/coordinates/[city]`

Busca as coordenadas da cidade informada.

### `GET /api/weather?lat={lat}&lon={lon}`

Busca as condições meteorológicas para latitude e longitude informadas.

As rotas possuem validação básica, timeout de requisição e cache para reduzir
chamadas externas repetidas.
