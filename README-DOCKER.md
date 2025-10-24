# 🚀 Sistema de Gestão de Rodovias e Pontes

Sistema completo com Laravel (Backend) e React (Frontend) para gestão de rodovias e pontes, com autenticação via token e visualização de mapa.

## 📋 Requisitos

- Docker
- Docker Compose

## 🛠️ Tecnologias

### Backend (Laravel)
- Laravel 12
- Laravel Sanctum (Autenticação via Token)
- MySQL 8.0
- PHP 8.2

### Frontend (React)
- React 18
- React Router DOM
- Axios
- Leaflet (Mapas)
- Design Governamental

## 🚀 Instalação e Execução

### 1. Clonar o Repositório (se aplicável)

```bash
git clone <seu-repositorio>
cd meu-projeto-laravel
```

### 2. Configurar Variáveis de Ambiente

O arquivo `.env.example` já está configurado. Ao iniciar os containers, ele será copiado automaticamente.

### 3. Iniciar os Containers

```bash
docker-compose up -d --build
```

Este comando irá:
- Construir as imagens Docker
- Iniciar os containers (MySQL, PHP, Nginx, React, PHPMyAdmin)
- Instalar dependências do Composer automaticamente
- Configurar o Laravel Sanctum
- Executar migrações do banco de dados
- Executar seeders

### 4. Acessar o Sistema

#### Frontend (React)
```
http://localhost:3000
```

#### Backend API (Laravel)
```
http://localhost:8080/api
```

#### PHPMyAdmin (Gerenciamento do Banco)
```
http://localhost:8081
Usuário: laravel_user
Senha: laravel_pass
```

## 📦 Containers

O sistema utiliza os seguintes containers:

| Container | Porta | Descrição |
|-----------|-------|-----------|
| `nginx` | 8080 | Servidor web (Laravel API) |
| `php` | 9000 | PHP-FPM |
| `mysql` | 3306 | Banco de dados |
| `react` | 3000 | Frontend React |
| `phpmyadmin` | 8081 | Interface do banco de dados |

## 🔧 Comandos Úteis

### Visualizar Logs

```bash
# Todos os containers
docker-compose logs -f

# Container específico
docker-compose logs -f php
docker-compose logs -f react
```

### Executar Comandos no Backend

```bash
# Entrar no container PHP
docker-compose exec php sh

# Executar migrações
docker-compose exec php php artisan migrate

# Executar seeders
docker-compose exec php php artisan db:seed

# Criar novo controller
docker-compose exec php php artisan make:controller NomeController

# Limpar cache
docker-compose exec php php artisan cache:clear
docker-compose exec php php artisan config:clear
```

### Executar Comandos no Frontend

```bash
# Entrar no container React
docker-compose exec react sh

# Instalar nova dependência
docker-compose exec react npm install nome-pacote

# Ver logs do React
docker-compose logs -f react
```

### Parar os Containers

```bash
docker-compose down
```

### Parar e Remover Volumes (Limpa o banco de dados)

```bash
docker-compose down -v
```

### Recriar os Containers

```bash
docker-compose down
docker-compose up -d --build
```

## 🗄️ Banco de Dados

O sistema já vem com migrations e seeders configurados:

### Tabelas Criadas
- `users` - Usuários do sistema
- `estados` - Estados brasileiros
- `municipios` - Municípios
- `rodovias` - Rodovias
- `pontes` - Pontes
- `personal_access_tokens` - Tokens do Sanctum

### Dados de Exemplo

Os seeders populam o banco com dados de exemplo:
- Estados brasileiros
- Municípios de exemplo
- Rodovias de exemplo
- Pontes com coordenadas

## 🔐 Autenticação

O sistema usa **Laravel Sanctum** para autenticação via token.

### Endpoints de Autenticação

```bash
# Registro
POST http://localhost:8080/api/register
Content-Type: application/json

{
  "name": "Seu Nome",
  "email": "email@exemplo.com",
  "password": "senha123",
  "password_confirmation": "senha123"
}

# Login
POST http://localhost:8080/api/login
Content-Type: application/json

{
  "email": "email@exemplo.com",
  "password": "senha123"
}

# Logout
POST http://localhost:8080/api/logout
Authorization: Bearer {seu-token}
```

## 📡 API Endpoints

### Rodovias
- `GET /api/rodovias` - Listar todas
- `POST /api/rodovias` - Criar nova
- `GET /api/rodovias/{id}` - Ver detalhes
- `PUT /api/rodovias/{id}` - Atualizar
- `DELETE /api/rodovias/{id}` - Excluir
- `GET /api/rodovias/{id}/pontes` - Pontes da rodovia

### Pontes
- `GET /api/pontes` - Listar todas
- `POST /api/pontes` - Criar nova
- `GET /api/pontes/{id}` - Ver detalhes
- `PUT /api/pontes/{id}` - Atualizar
- `DELETE /api/pontes/{id}` - Excluir
- `GET /api/pontes?with_coordinates=true` - Apenas com coordenadas

**Nota:** Todos os endpoints (exceto login/register) requerem autenticação via token Bearer.

## 🗺️ Funcionalidades

✅ **Autenticação Completa**
- Login e Registro
- Proteção de rotas
- Logout

✅ **CRUD de Rodovias**
- Listar, criar, editar, excluir
- Ver pontes da rodovia
- Design governamental

✅ **CRUD de Pontes**
- Listar, criar, editar, excluir
- Coordenadas geográficas
- Vinculação com rodovias

✅ **Mapa Interativo**
- Visualização de pontes no mapa
- Marcadores clicáveis
- Informações detalhadas

✅ **Dashboard**
- Estatísticas gerais
- Listagem de itens recentes
- Ações rápidas

## 🎨 Design

O sistema utiliza um design baseado nas diretrizes do **Gov.br**:
- Cores oficiais do governo brasileiro
- Interface moderna e responsiva
- Acessibilidade
- UX otimizada

## 🔄 Atualizações Futuras

- [ ] Upload de fotos das pontes
- [ ] Relatórios em PDF
- [ ] Exportação de dados
- [ ] Sistema de permissões
- [ ] Histórico de alterações
- [ ] Notificações

## 🐛 Solução de Problemas

### Problema: Containers não iniciam

```bash
docker-compose down -v
docker-compose up -d --build
```

### Problema: Erro de permissão

```bash
sudo chown -R $USER:$USER .
```

### Problema: Frontend não conecta com Backend

Verifique se as portas estão corretas no arquivo `.env` do frontend:
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Problema: Banco de dados vazio

```bash
docker-compose exec php php artisan migrate:fresh --seed
```

## 📝 Licença

Este projeto é parte de um sistema governamental.

## 👥 Suporte

Para questões e suporte, entre em contato com a equipe de desenvolvimento.

