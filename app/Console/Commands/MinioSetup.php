<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;

class MinioSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'minio:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configura o MinIO e cria o bucket necessário';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Iniciando configuração do MinIO...');

        try {
            $disk = Storage::disk('minio');
            $bucketName = config('filesystems.disks.minio.bucket');

            $this->info("📦 Verificando bucket: {$bucketName}");

            // Obter o cliente S3 através do adaptador (Flysystem 3.x)
            $adapter = $disk->getAdapter();
            $client = new S3Client([
                'version' => 'latest',
                'region' => config('filesystems.disks.minio.region'),
                'endpoint' => config('filesystems.disks.minio.endpoint'),
                'use_path_style_endpoint' => config('filesystems.disks.minio.use_path_style_endpoint'),
                'credentials' => [
                    'key' => config('filesystems.disks.minio.key'),
                    'secret' => config('filesystems.disks.minio.secret'),
                ],
            ]);

            // Verificar se o bucket existe
            if (!$client->doesBucketExist($bucketName)) {
                $this->info("🔨 Criando bucket: {$bucketName}");
                
                $client->createBucket([
                    'Bucket' => $bucketName,
                ]);

                $this->info("✅ Bucket '{$bucketName}' criado com sucesso!");

                // Configurar política pública para leitura
                $policy = json_encode([
                    'Version' => '2012-10-17',
                    'Statement' => [
                        [
                            'Effect' => 'Allow',
                            'Principal' => ['AWS' => ['*']],
                            'Action' => ['s3:GetObject'],
                            'Resource' => ["arn:aws:s3:::{$bucketName}/*"],
                        ],
                    ],
                ]);

                try {
                    $client->putBucketPolicy([
                        'Bucket' => $bucketName,
                        'Policy' => $policy,
                    ]);
                    $this->info("✅ Política de acesso público configurada!");
                } catch (AwsException $e) {
                    $this->warn("⚠️  Não foi possível configurar política pública: " . $e->getMessage());
                }
            } else {
                $this->info("✅ Bucket '{$bucketName}' já existe!");
            }

            // Testar conexão
            $this->info("🔍 Testando conexão com MinIO...");
            $buckets = $client->listBuckets();
            $this->info("✅ Conexão estabelecida! Buckets disponíveis: " . count($buckets['Buckets']));

            $this->newLine();
            $this->info("✨ Configuração do MinIO concluída com sucesso!");
            $this->newLine();
            $this->info("📍 Console MinIO: http://localhost:9001");
            $this->info("🔑 Usuário: " . config('filesystems.disks.minio.key'));
            $this->info("🔐 Senha: " . config('filesystems.disks.minio.secret'));

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error("❌ Erro ao configurar MinIO: " . $e->getMessage());
            $this->newLine();
            $this->warn("💡 Dicas de solução:");
            $this->warn("   1. Verifique se o container do MinIO está rodando: docker-compose ps");
            $this->warn("   2. Verifique as credenciais no arquivo .env");
            $this->warn("   3. Tente reiniciar o MinIO: docker-compose restart minio");

            return Command::FAILURE;
        }
    }
}

