# 🚀 Instruções para Configurar o Projeto

## ⚠️ IMPORTANTE: Execute estes comandos antes de testar!

### Opção 1: Usando Docker (Recomendado)

```bash
# 1. Certifique-se de que o Docker está rodando
docker-compose up -d

# 2. Execute as migrations
docker-compose exec app php artisan migrate

# 3. Execute os seeders
docker-compose exec app php artisan db:seed

# 4. Ou, para recriar tudo do zero:
docker-compose exec app php artisan migrate:fresh --seed
```

### Opção 2: Ambiente Local (com SQLite)

```bash
cd meu-projeto-laravel

# 1. Configure para usar SQLite (se preferir)
# Edite .env e mude:
# DB_CONNECTION=sqlite
# DB_DATABASE=database/database.sqlite

# 2. Crie o arquivo do banco
touch database/database.sqlite

# 3. Execute as migrations
php artisan migrate

# 4. Execute os seeders
php artisan db:seed

# 5. Ou, para recriar tudo:
php artisan migrate:fresh --seed
```

## ✅ O que deve acontecer:

Após executar os comandos acima, o sistema terá:

1. ✅ **27 Estados** cadastrados (incluindo Rondônia - ID 22)
2. ✅ **27 Municípios** de Rondônia cadastrados
3. ✅ **7 Rodovias** de Rondônia cadastradas
4. ✅ **Tabela pivô** `municipio_rodovia` criada

## 🧪 Testando:

1. **Backend:**
   ```bash
   # Testar API de estados
   curl http://localhost:8000/api/estados
   
   # Testar API de municípios
   curl http://localhost:8000/api/municipios?estado_id=22
   
   # Testar API de rodovias
   curl http://localhost:8000/api/rodovias
   ```

2. **Frontend:**
   - Acesse: http://localhost:3000/rodovias
   - Clique em "+ Nova Rodovia"
   - Os municípios de Rondônia devem aparecer para seleção

## 🔧 Solução de Problemas:

### Problema: "Erro ao carregar rodovias"
**Solução:** Execute as migrations e seeders conforme acima

### Problema: "Municípios não aparecem"
**Solução:** 
1. Verifique se os seeders foram executados
2. Teste a API diretamente: `curl http://localhost:8000/api/municipios?estado_id=22`
3. Verifique o console do navegador para erros

### Problema: "could not find driver"
**Solução:** Se usando MySQL/Docker, certifique-se de que os containers estão rodando:
```bash
docker-compose ps
docker-compose up -d
```

## 📊 Estrutura do Banco:

```
estados (27 registros)
  └─ municipios (27 de Rondônia)
       └─ municipio_rodovia (tabela pivô N:N)
            └─ rodovias (7 de Rondônia)
```

## 🎯 Fluxo de Criação de Rodovia:

1. Estado **Rondônia** vem selecionado por padrão
2. Lista de **municípios de Rondônia** carrega automaticamente
3. Usuário seleciona múltiplos municípios (Ctrl+clique)
4. Checkbox "Alterar estado" permite mudar para outro estado
5. Ao salvar, os municípios são vinculados na tabela pivô

