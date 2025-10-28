#!/bin/sh

# Script de inicialização do container PHP-FPM

# Aguardar o MySQL estar pronto (opcional, mas recomendado)
echo "Aguardando MySQL..."
until nc -z -v -w30 mysql 3306
do
  echo "Aguardando conexão com MySQL..."
  sleep 2
done

echo "MySQL está pronto!"

# Aguardar o Redis estar pronto
echo "Aguardando Redis..."
until nc -z -v -w30 redis 6379
do
  echo "Aguardando conexão com Redis..."
  sleep 2
done

echo "Redis está pronto!"

# Executar migrações (se necessário)
# Descomente a linha abaixo se quiser executar migrações automaticamente
# php artisan migrate --force

# Limpar cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Otimizar para produção (descomente se necessário)
# php artisan config:cache
# php artisan route:cache
# php artisan view:cache

echo "Laravel configurado com sucesso!"

# Iniciar PHP-FPM
echo "Iniciando PHP-FPM..."
php-fpm

