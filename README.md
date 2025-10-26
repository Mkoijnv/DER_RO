# 🌉 Sistema de Gestão de Pontes e Rodovias - Rondônia

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-C72E49?style=for-the-badge&logo=minio&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Sistema completo de gerenciamento de infraestrutura viária do Estado de Rondônia**

[Instalação](#-instalação) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [MinIO](#%EF%B8%8F-minio---armazenamento-de-objetos) • [API](#-endpoints-da-api)

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
- **MySQL** - Banco de dados leve e robusto
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
- **MinIO** - Object Storage S3-compatible

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
- ✅ Instalar dependências do Laravel (incluindo suporte MinIO)
- ✅ Instalar dependências do React
- ✅ Configurar banco de dados
- ✅ Executar migrations e seeders
- ✅ Configurar MinIO e criar bucket
- ✅ Criar link simbólico para storage
- ✅ Iniciar os servidores

#### 3️⃣ Acesse a Aplicação

- **Frontend (React):** http://localhost:3000
- **Backend (Laravel API):** http://localhost:8080
- **Documentação da API:** http://localhost:8080/api
- **PHPMyAdmin:** http://localhost:8081
- **MinIO Console:** http://localhost:9001

#### 4️⃣ Credenciais de Acesso

**Sistema:**
```
Email: admin@rondonia.gov.br
Senha: password
```

**MinIO Console:**
```
Usuário: minioadmin
Senha: minioadmin123
```

**PHPMyAdmin:**
```
Servidor: mysql
Usuário: laravel_user
Senha: laravel_pass
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

### MinIO

```bash
# Acessar logs do MinIO
docker-compose logs -f minio

# Reiniciar MinIO
docker-compose restart minio

# Acessar console do MinIO
# http://localhost:9001

# Verificar status do bucket
docker-compose exec php bash
mc alias set myminio http://minio:9000 minioadmin minioadmin123
mc ls myminio/pontes
```

---

## 📁 Estrutura do Projeto

```
📦 meu-projeto-laravel/
├── 🐘 app/                          # Lógica da aplicação Laravel
│   ├── Console/Commands/           # Comandos Artisan personalizados
│   ├── Http/Controllers/           # Controllers da API
│   └── Models/                     # Models Eloquent
├── ⚙️ config/                       # Configurações Laravel
│   └── filesystems.php             # Configuração do MinIO/Storage
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
│   ├── nginx/                      # Configuração Nginx
│   └── minio/                      # Scripts MinIO
├── 📝 docker-compose.yml           # Orquestração de containers
├── 🚀 init.bat                     # Script de inicialização Windows
├── 🗄️ MINIO-SETUP.md               # Guia de configuração do MinIO
└── 📖 README.md                    # Este arquivo
```

---

## 🔌 Endpoints da API

O sistema disponibiliza uma **API RESTful completa** com autenticação via Laravel Sanctum. Todos os endpoints (exceto login/register) requerem autenticação via token Bearer.

**Base URL:** `http://localhost:8080/api`

### 🔐 Autenticação

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@rondonia.gov.br",
  "password": "password"
}
```

**Resposta (200 OK):**
```json
{
  "token": "1|abc123...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@rondonia.gov.br"
  }
}
```

#### Registro
```http
POST /api/register
Content-Type: application/json

{
  "name": "Novo Usuário",
  "email": "usuario@example.com",
  "password": "senha123",
  "password_confirmation": "senha123"
}
```

#### Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

### 🛣️ Rodovias

#### Listar todas as rodovias
```http
GET /api/rodovias
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "RO-010",
    "trecho_inicial": "Porto Velho",
    "trecho_final": "Abunã",
    "extensao_km": 195.5,
    "situacao": "boa",
    "created_at": "2024-01-20T10:30:00.000000Z",
    "updated_at": "2024-01-20T10:30:00.000000Z",
    "municipios": [...]
  }
]
```

#### Buscar rodovia específica
```http
GET /api/rodovias/{id}
Authorization: Bearer {token}
```

#### Criar nova rodovia
```http
POST /api/rodovias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "RO-010",
  "trecho_inicial": "Porto Velho",
  "trecho_final": "Abunã",
  "extensao_km": 195.5,
  "situacao": "boa"
}
```

#### Atualizar rodovia
```http
PUT /api/rodovias/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "situacao": "regular"
}
```

#### Excluir rodovia
```http
DELETE /api/rodovias/{id}
Authorization: Bearer {token}
```

#### Vincular municípios a uma rodovia
```http
POST /api/rodovias/{id}/municipios
Authorization: Bearer {token}
Content-Type: application/json

{
  "municipio_ids": [1, 2, 3, 5]
}
```

---

### 🌉 Pontes

#### Listar todas as pontes
```http
GET /api/pontes
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "rodovia_id": 1,
    "nome": "Ponte sobre o Rio Madeira",
    "rio": "Rio Madeira",
    "km": 12.5,
    "latitude": -8.761953,
    "longitude": -63.900000,
    "material": "concreto",
    "situacao": "boa",
    "foto": "1761357822_ponte_madeira.jpeg",
    "foto_url": "http://localhost:9000/pontes/1761357822_ponte_madeira.jpeg",
    "created_at": "2024-01-20T10:30:00.000000Z",
    "updated_at": "2024-01-20T10:30:00.000000Z",
    "rodovia": {
      "id": 1,
      "nome": "RO-010",
      ...
    }
  }
]
```

> 💡 **Nota:** O campo `foto_url` contém a URL completa e pública da imagem armazenada no MinIO.

#### Buscar ponte específica
```http
GET /api/pontes/{id}
Authorization: Bearer {token}
```

#### Criar nova ponte (com foto)
```http
POST /api/pontes
Authorization: Bearer {token}
Content-Type: multipart/form-data

rodovia_id: 1
nome: Ponte sobre o Rio Candeias
rio: Rio Candeias
km: 25.3
latitude: -8.7619
longitude: -63.9000
material: concreto
situacao: boa
foto: [arquivo]
```

**Validações:**
- `foto`: Opcional, formatos: jpeg, png, jpg, gif, webp (max: 5MB)
- `material`: concreto, aço, madeira, misto
- `situacao`: boa, regular, ruim, interditada

**Resposta (201 Created):**
```json
{
  "message": "Ponte criada com sucesso",
  "data": {
    "id": 15,
    "nome": "Ponte sobre o Rio Candeias",
    "foto": "1761357822_candeias.jpeg",
    "foto_url": "http://localhost:9000/pontes/1761357822_candeias.jpeg",
    ...
  }
}
```

#### Atualizar ponte (com nova foto)
```http
POST /api/pontes/{id}
Authorization: Bearer {token}
Content-Type: multipart/form-data

_method: PUT
situacao: regular
foto: [novo_arquivo]
```

> 💡 **Nota:** Ao enviar uma nova foto, a anterior é automaticamente excluída do MinIO.

#### Excluir ponte
```http
DELETE /api/pontes/{id}
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
{
  "message": "Ponte excluída com sucesso"
}
```

> 💡 **Nota:** A foto associada é automaticamente excluída do MinIO.

#### Listar pontes com coordenadas
```http
GET /api/pontes?with_coordinates=true
Authorization: Bearer {token}
```

---

### 🏙️ Municípios e Estados

#### Listar todos os estados
```http
GET /api/estados
Authorization: Bearer {token}
```

#### Listar todos os municípios
```http
GET /api/municipios
Authorization: Bearer {token}
```

#### Listar municípios de um estado
```http
GET /api/estados/{estado_id}/municipios
Authorization: Bearer {token}
```

---

### 📝 Exemplos Práticos

#### Exemplo 1: Login e Upload de Foto de Ponte

```javascript
// 1. Fazer login
const loginResponse = await fetch('http://localhost:8080/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@rondonia.gov.br',
    password: 'password'
  })
});
const { token } = await loginResponse.json();

// 2. Upload de ponte com foto
const formData = new FormData();
formData.append('rodovia_id', '1');
formData.append('nome', 'Ponte Nova');
formData.append('rio', 'Rio Jamari');
formData.append('km', '15.5');
formData.append('material', 'concreto');
formData.append('situacao', 'boa');
formData.append('foto', fileInput.files[0]);

const ponteResponse = await fetch('http://localhost:8080/api/pontes', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
const ponte = await ponteResponse.json();

// 3. A URL da foto está em ponte.data.foto_url
console.log('Foto disponível em:', ponte.data.foto_url);
// Saída: http://localhost:9000/pontes/1761357822_foto.jpeg
```

#### Exemplo 2: Listar Pontes com Filtro

```javascript
// Listar apenas pontes com coordenadas GPS
const response = await fetch(
  'http://localhost:8080/api/pontes?with_coordinates=true',
  {
    headers: { 'Authorization': `Bearer ${token}` }
  }
);
const pontesComGPS = await response.json();

// Exibir no mapa
pontesComGPS.forEach(ponte => {
  console.log(`${ponte.nome}: [${ponte.latitude}, ${ponte.longitude}]`);
  console.log(`Foto: ${ponte.foto_url}`);
});
```

#### Exemplo 3: Atualizar Situação de Ponte

```javascript
const response = await fetch('http://localhost:8080/api/pontes/5', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    situacao: 'ruim'
  })
});
const resultado = await response.json();
console.log(resultado.message); // "Ponte atualizada com sucesso"
```

---

### 🔄 Códigos de Resposta HTTP

| Código | Descrição |
|--------|-----------|
| `200` | Requisição bem-sucedida |
| `201` | Recurso criado com sucesso |
| `401` | Não autenticado (token inválido/expirado) |
| `403` | Acesso negado |
| `404` | Recurso não encontrado |
| `422` | Erro de validação |
| `500` | Erro interno do servidor |

### 🛡️ Segurança da API

- ✅ Autenticação via Laravel Sanctum
- ✅ Tokens com expiração configurável
- ✅ Validação de dados em todas as requisições
- ✅ CORS configurado para frontend React
- ✅ Rate limiting por IP
- ✅ Sanitização de uploads de arquivos

### 📖 Documentação Interativa

Acesse a documentação interativa da API em:
```
http://localhost:8080/api
```

Esta página contém todos os endpoints, parâmetros e exemplos de resposta.

---

## 🗄️ MinIO - Armazenamento de Objetos

O sistema utiliza o **MinIO** como solução de armazenamento de objetos (Object Storage) compatível com S3 da Amazon. Todas as imagens das pontes são armazenadas no MinIO ao invés do sistema de arquivos local, proporcionando:

### Vantagens do MinIO

- ✅ **Escalabilidade**: Fácil expansão do armazenamento
- ✅ **Compatibilidade S3**: API compatível com Amazon S3
- ✅ **Interface Web**: Console de administração intuitivo
- ✅ **Alta Performance**: Otimizado para grandes volumes de dados
- ✅ **Backup e Redundância**: Fácil replicação e backup
- ✅ **Distribuição**: Pronto para ambientes distribuídos
- ✅ **URLs Públicas**: Acesso direto às imagens via URL

### Configuração do MinIO

O MinIO já está configurado no `docker-compose.yml` e será iniciado automaticamente. As configurações incluem:

**Portas:**
- `9000`: API do MinIO (acesso às imagens)
- `9001`: Console Web (interface de administração)

**Credenciais padrão:**
- Usuário: `minioadmin`
- Senha: `minioadmin123`

**Bucket:** `pontes` (criado automaticamente via comando artisan)

### Setup Inicial do MinIO

Após iniciar os containers pela primeira vez, execute o comando de setup:

```bash
# Configurar MinIO e criar bucket
docker-compose exec php php artisan minio:setup
```

Este comando irá:
- ✅ Verificar a conexão com o MinIO
- ✅ Criar o bucket `pontes` (se não existir)
- ✅ Configurar política de acesso público
- ✅ Testar a conectividade

**Saída esperada:**
```
🚀 Iniciando configuração do MinIO...
📦 Verificando bucket: pontes
🔨 Criando bucket: pontes
✅ Bucket 'pontes' criado com sucesso!
✅ Política de acesso público configurada!
✅ Conexão estabelecida!
```

### Acessando o MinIO Console

1. Acesse http://localhost:9001
2. Faça login com:
   - **Usuário:** `minioadmin`
   - **Senha:** `minioadmin123`
3. Navegue até o bucket `pontes` para visualizar e gerenciar as imagens

### Como Funciona o Armazenamento

**Estrutura do Bucket:**
```
pontes/                          (bucket)
  ├── 1761357822_16 DE JUNHO.jpeg
  ├── 1761357872_ponte_areabranca_800px_06.jpg
  ├── 1761401644_TELA.png
  └── ...
```

**URLs Geradas:**
```
http://localhost:9000/pontes/1761357822_16%20DE%20JUNHO.jpeg
http://localhost:9000/pontes/1761357872_ponte_areabranca_800px_06.jpg
```

> 💡 **Nota:** As URLs são geradas automaticamente com encoding correto (espaços = %20)

### Upload de Imagens

Quando você faz upload de uma foto de ponte:

1. O arquivo é enviado via FormData
2. Laravel processa e valida (max 5MB)
3. Arquivo é salvo diretamente no MinIO (bucket `pontes`)
4. Caminho é salvo no banco de dados (ex: `1761357822_foto.jpeg`)
5. URL pública é gerada automaticamente

**Código exemplo (Controller):**
```php
// Upload automático para MinIO
if ($request->hasFile('foto')) {
    $foto = $request->file('foto');
    $nomeArquivo = time() . '_' . $foto->getClientOriginalName();
    $caminhoFoto = $foto->storeAs('', $nomeArquivo, 'minio');
    $data['foto'] = $caminhoFoto;
}
```

### Variáveis de Ambiente do MinIO

As seguintes variáveis devem estar no arquivo `.env`:

```env
# Configurações do MinIO
FILESYSTEM_DISK=minio
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_REGION=us-east-1
MINIO_BUCKET=pontes
MINIO_URL=http://localhost:9000
MINIO_ENDPOINT=http://minio:9000
```

> ⚠️ **Importante:** Em produção, altere as credenciais padrão!

### Comandos Artisan do MinIO

O sistema inclui comandos personalizados para gerenciar o MinIO:

```bash
# Configurar MinIO e criar bucket
docker-compose exec php php artisan minio:setup

# Configurar permissões públicas nas imagens
docker-compose exec php php artisan minio:set-public
```

### Troubleshooting

**Erro: "NoSuchKey" ao acessar imagem**
- Verifique se o bucket foi criado: execute `php artisan minio:setup`
- Verifique as permissões: execute `php artisan minio:set-public`

**Erro: "Connection refused"**
- Verifique se o container MinIO está rodando: `docker-compose ps`
- Reinicie o MinIO: `docker-compose restart minio`

**Erro: "Class not found" (Flysystem)**
- Instale as dependências: `docker-compose exec php composer install`

### Backup de Imagens

Para fazer backup das imagens do MinIO:

**Opção 1: Via Console Web**
1. Acesse http://localhost:9001
2. Selecione o bucket `pontes`
3. Use a opção de download em massa

**Opção 2: Via MinIO Client (CLI)**
```bash
# Instalar mc (MinIO Client)
docker-compose exec php bash
wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/local/bin/mc
chmod +x /usr/local/bin/mc

# Configurar conexão
mc alias set myminio http://minio:9000 minioadmin minioadmin123

# Fazer backup
mc mirror myminio/pontes /backup/pontes

# Restaurar backup
mc mirror /backup/pontes myminio/pontes
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
- Armazenamento em **MinIO** (Object Storage S3-compatible)
- Bucket dedicado: `pontes`
- Visualização direta no mapa e detalhes
- Gerenciamento via MinIO Console

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
