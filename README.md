# 🌉 Sistema de Gestão de Pontes e Rodovias - Rondônia

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Sistema completo de gerenciamento de infraestrutura viária do Estado de Rondônia**

[Instalação](#-instalação) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [API](#-endpoints-da-api)

</div>

---

## 📋 Sobre o Projeto

O **Sistema de Gestão de Pontes e Rodovias** é uma plataforma web moderna desenvolvida para o Governo do Estado de Rondônia, com o objetivo de centralizar e facilitar o gerenciamento de informações sobre a infraestrutura viária estadual.

Através de uma interface intuitiva e profissional, o sistema permite o cadastro, monitoramento e visualização de rodovias estaduais e pontes, incluindo seus status operacionais, localização geográfica, características técnicas e fotos, proporcionando uma visão completa e em tempo real da malha viária de Rondônia.

### 🎯 Objetivos

- ✅ Centralizar informações sobre rodovias e pontes estaduais
- ✅ Facilitar o monitoramento da situação estrutural das pontes
- ✅ Proporcionar visualização geográfica através de mapas interativos
- ✅ Gerar relatórios e exportar dados para análise
- ✅ Garantir rastreabilidade e histórico de manutenções
- ✅ Otimizar a gestão de recursos para infraestrutura viária

---

## ✨ Funcionalidades

### 🛣️ Gestão de Rodovias
- Cadastro completo de rodovias estaduais
- Informações detalhadas: trechos, extensão e situação
- Associação com municípios atravessados
- Exportação de dados para CSV
- Busca e filtros avançados

### 🌉 Gestão de Pontes
- Cadastro completo de pontes com geolocalização
- Upload e visualização de fotos
- Informações técnicas: material, dimensões, situação
- Monitoramento por status (Boa, Regular, Ruim, Interditada)
- Coordenadas GPS para cada ponte

### 🗺️ Visualização em Mapa
- Mapa interativo com todas as pontes georreferenciadas
- Navegação entre pontes com filtros
- Visualização de fotos diretamente no mapa
- Busca por situação e localização
- Marcadores personalizados por status

### 📊 Dashboard Analítico
- Estatísticas em tempo real
- Indicadores de pontes em bom estado
- Quantitativo de rodovias e pontes cadastradas
- Visualização de itens recentes
- Ações rápidas para cadastros

### 🔐 Autenticação e Segurança
- Sistema de login com Laravel Sanctum
- Proteção de rotas e APIs
- Controle de acesso por usuário
- Sessões seguras

---

## 🚀 Tecnologias

### Backend
- **Laravel 11.x** - Framework PHP moderno
- **SQLite** - Banco de dados leve e portátil
- **Laravel Sanctum** - Autenticação API
- **PHP 8.2+** - Linguagem de programação

### Frontend
- **React 18.x** - Biblioteca JavaScript
- **React Router** - Navegação SPA
- **Lucide React** - Ícones SVG profissionais
- **Leaflet** - Mapas interativos
- **Axios** - Cliente HTTP

### DevOps
- **Docker & Docker Compose** - Containerização
- **Nginx** - Servidor web
- **Node.js 20.x** - Runtime JavaScript

---

## 📦 Instalação

### Pré-requisitos

- Docker Desktop instalado
- Git instalado
- Portas 8000 (backend) e 3000 (frontend) disponíveis

### Passo a Passo

#### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/sistema-pontes-rondonia.git
cd sistema-pontes-rondonia
```

#### 2️⃣ Execute o Script de Inicialização

**Windows:**
```bash
init.bat
```

**Linux/Mac:**
```bash
chmod +x init.sh
./init.sh
```

O script automaticamente irá:
- ✅ Criar e configurar os containers Docker
- ✅ Instalar dependências do Laravel
- ✅ Instalar dependências do React
- ✅ Configurar banco de dados
- ✅ Executar migrations e seeders
- ✅ Criar link simbólico para storage
- ✅ Iniciar os servidores

#### 3️⃣ Acesse a Aplicação

- **Frontend (React):** http://localhost:3000
- **Backend (Laravel API):** http://localhost:8080
- **Documentação da API:** http://localhost:8080/api
- **PHPMyAdmin:** http://localhost:8081

#### 4️⃣ Credenciais de Acesso

```
Email: admin@rondonia.gov.br
Senha: password
```

---

## 🐳 Comandos Docker Úteis

### Gerenciar Containers

```bash
# Iniciar containers
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Acessar container PHP
docker-compose exec php bash

# Acessar container React
docker-compose exec react sh
```

### Laravel (dentro do container PHP)

```bash
# Rodar migrations
php artisan migrate

# Rodar seeders
php artisan db:seed

# Limpar cache
php artisan cache:clear

# Criar link simbólico para storage
php artisan storage:link
```

### React (dentro do container React)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build
```

---

## 📁 Estrutura do Projeto

```
📦 meu-projeto-laravel/
├── 🐘 app/                          # Lógica da aplicação Laravel
│   ├── Http/Controllers/           # Controllers da API
│   └── Models/                     # Models Eloquent
├── ⚙️ config/                       # Configurações Laravel
├── 🗄️ database/
│   ├── migrations/                 # Migrações do banco
│   └── seeders/                    # Dados iniciais
├── 🎨 frontend/                     # Aplicação React
│   ├── public/                     # Arquivos públicos
│   └── src/
│       ├── components/             # Componentes React
│       ├── services/               # Serviços API
│       └── contexts/               # Context API
├── 🛣️ routes/
│   ├── api.php                     # Rotas da API
│   └── web.php                     # Rotas web
├── 🐳 docker/                       # Configurações Docker
├── 📝 docker-compose.yml           # Orquestração de containers
├── 🚀 init.bat                     # Script de inicialização Windows
└── 📖 README.md                    # Este arquivo
```

---

## 🔌 Endpoints da API

O sistema disponibiliza uma API RESTful completa. Todos os endpoints (exceto login/register) requerem autenticação via token Bearer.

### Autenticação

```bash
# Login
POST /api/login
Body: { "email": "admin@rondonia.gov.br", "password": "password" }

# Registro
POST /api/register
Body: { "name": "Nome", "email": "email@example.com", "password": "senha" }

# Logout
POST /api/logout
Headers: { "Authorization": "Bearer {token}" }
```

### Rodovias

```bash
# Listar todas
GET /api/rodovias

# Buscar por ID
GET /api/rodovias/{id}

# Criar nova
POST /api/rodovias
Body: { "nome": "RO-010", "trecho_inicial": "Porto Velho", ... }

# Atualizar
PUT /api/rodovias/{id}

# Excluir
DELETE /api/rodovias/{id}

# Vincular municípios
POST /api/rodovias/{id}/municipios
Body: { "municipio_ids": [1, 2, 3] }
```

### Pontes

```bash
# Listar todas
GET /api/pontes

# Buscar por ID
GET /api/pontes/{id}

# Criar nova (com foto)
POST /api/pontes
Content-Type: multipart/form-data
Body: FormData com campos + foto

# Atualizar
POST /api/pontes/{id} (com _method=PUT)

# Excluir
DELETE /api/pontes/{id}
```

### Municípios e Estados

```bash
# Listar estados
GET /api/estados

# Listar municípios
GET /api/municipios

# Municípios por estado
GET /api/estados/{estado_id}/municipios
```

### Exemplo de Uso (JavaScript)

```javascript
// Login
const response = await fetch('http://localhost:8080/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@rondonia.gov.br',
    password: 'password'
  })
});
const { token } = await response.json();

// Listar rodovias
const rodovias = await fetch('http://localhost:8080/api/rodovias', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(res => res.json());
```

---

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
php artisan key:generate
```

### Principais Configurações

```env
# Aplicação
APP_NAME="Sistema de Pontes - Rondônia"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8080

# Banco de Dados
DB_CONNECTION=sqlite

# Frontend
REACT_APP_API_URL=http://localhost:8080
```

---

## 📊 Recursos Adicionais

### Exportação de Dados

O sistema permite exportar tabelas de rodovias e pontes para formato CSV, compatível com Excel:

- Codificação UTF-8 com BOM
- Separador de colunas configurável
- Nome de arquivo com data automática

### Upload de Imagens

As pontes podem ter fotos associadas:

- Formatos suportados: JPG, PNG, GIF, WebP
- Tamanho máximo: 5MB por imagem
- Armazenamento em `storage/app/public/pontes`
- Visualização direta no mapa e detalhes

### Mapa Interativo

Baseado em Leaflet/OpenStreetMap:

- Marcadores personalizados
- Popups informativos
- Navegação entre pontes
- Filtros por situação
- Zoom automático

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

Desenvolvido com ❤️ para o Governo do Estado de Rondônia

---

## 📞 Suporte

Para dúvidas, sugestões ou reportar problemas:

- 📧 Email: suporte@rondonia.gov.br
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/sistema-pontes-rondonia/issues)
- 📖 Wiki: [Documentação Completa](https://github.com/seu-usuario/sistema-pontes-rondonia/wiki)

---

<div align="center">

**🌉 Sistema de Gestão de Pontes e Rodovias - Rondônia**

Construindo o futuro da infraestrutura viária

[⬆ Voltar ao topo](#-sistema-de-gestão-de-pontes-e-rodovias---rondônia)

</div>
