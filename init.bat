@echo off
echo Iniciando configuração do projeto Laravel...

REM Criar diretórios necessários
if not exist storage\logs mkdir storage\logs
if not exist bootstrap\cache mkdir bootstrap\cache

echo Diretórios criados com sucesso!
echo.
echo Para continuar, execute:
echo docker-compose up -d
echo.
pause