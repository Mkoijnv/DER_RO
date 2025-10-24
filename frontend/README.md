# Frontend - Sistema de Gestão de Rodovias e Pontes

Sistema desenvolvido em React com design governamental moderno para gestão de rodovias e pontes.

## 🚀 Funcionalidades

- ✅ Autenticação via Token (Laravel Sanctum)
- ✅ CRUD completo de Rodovias
- ✅ CRUD completo de Pontes
- ✅ Dashboard com estatísticas
- ✅ Visualização de pontes em mapa interativo (Leaflet)
- ✅ Design governamental baseado no Gov.br
- ✅ Interface responsiva e moderna

## 🛠️ Tecnologias

- React 18
- React Router DOM
- Axios
- Leaflet / React-Leaflet
- CSS3 (Design System Governamental)

## 📦 Instalação

### Com Docker (Recomendado)

```bash
# Na raiz do projeto Laravel
docker-compose up -d react
```

### Local (sem Docker)

```bash
cd frontend
npm install
npm start
```

## 🎨 Design System

O projeto utiliza um design system baseado nas diretrizes do Gov.br, incluindo:

- Cores oficiais do governo
- Tipografia padronizada
- Componentes acessíveis
- Interface intuitiva

## 🗺️ Mapa Interativo

O sistema inclui visualização de pontes em mapa interativo usando Leaflet:
- Marcadores para cada ponte com coordenadas
- Popup com informações detalhadas
- Navegação para detalhes da ponte

## 📱 Responsividade

Todas as telas são responsivas e funcionam perfeitamente em:
- Desktop
- Tablet
- Mobile

## 🔐 Autenticação

O sistema usa autenticação via token JWT/Sanctum:
- Login
- Registro
- Proteção de rotas
- Logout automático em caso de token inválido

## 🌐 API

O frontend consome a API Laravel em `http://localhost:8080/api`

Endpoints principais:
- POST /api/login
- POST /api/register
- POST /api/logout
- GET/POST/PUT/DELETE /api/rodovias
- GET/POST/PUT/DELETE /api/pontes

## 📄 Licença

Este projeto é parte de um sistema governamental.

