#!/bin/bash

# Script para inicializar o bucket do MinIO
# Este script deve ser executado após o MinIO estar rodando

echo "Aguardando MinIO iniciar..."
sleep 10

# Instalar o cliente mc (MinIO Client)
wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/local/bin/mc
chmod +x /usr/local/bin/mc

# Configurar o alias do MinIO
mc alias set myminio http://minio:9000 minioadmin minioadmin123

# Criar o bucket 'pontes' se não existir
mc mb myminio/pontes --ignore-existing

# Definir política de acesso público para o bucket (para leitura de imagens)
mc anonymous set download myminio/pontes

echo "Bucket 'pontes' criado e configurado com sucesso!"

