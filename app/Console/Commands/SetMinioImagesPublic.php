<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;

class SetMinioImagesPublic extends Command
{
    protected $signature = 'minio:set-public';
    protected $description = 'Configura as imagens do MinIO como públicas';

    public function handle()
    {
        $this->info('🔧 Configurando imagens como públicas no MinIO...');
        $this->newLine();

        try {
            $disk = Storage::disk('minio');
            $bucketName = config('filesystems.disks.minio.bucket');
            
            // Criar cliente S3
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

            // Configurar política do bucket como pública
            $this->info("📦 Configurando política pública do bucket '{$bucketName}'...");
            
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
                $this->info("✅ Política do bucket configurada!");
            } catch (AwsException $e) {
                $this->warn("⚠️  Aviso ao configurar política: " . $e->getMessage());
            }

            // Listar e configurar visibilidade de todos os arquivos
            $this->info("🔍 Configurando visibilidade dos arquivos...");
            $files = $disk->allFiles('pontes');
            
            $progressBar = $this->output->createProgressBar(count($files));
            $progressBar->start();

            $successCount = 0;
            $errorCount = 0;

            foreach ($files as $file) {
                try {
                    $disk->setVisibility($file, 'public');
                    $successCount++;
                } catch (\Exception $e) {
                    $this->newLine();
                    $this->error("   ❌ Erro ao configurar '{$file}': " . $e->getMessage());
                    $errorCount++;
                }
                $progressBar->advance();
            }

            $progressBar->finish();
            $this->newLine();
            $this->newLine();

            // Teste de acesso
            $this->info("🔍 Testando acesso às imagens...");
            $this->newLine();

            foreach ($files as $file) {
                $url = $disk->url($file);
                $this->line("   📷 {$file}");
                $this->line("      🌐 {$url}");
            }

            $this->newLine();
            $this->info("✨ Configuração concluída!");
            $this->newLine();

            $this->table(
                ['Status', 'Quantidade'],
                [
                    ['✅ Arquivos configurados', $successCount],
                    ['❌ Erros', $errorCount],
                    ['📊 Total', count($files)],
                ]
            );

            $this->newLine();
            $this->info("💡 Agora tente acessar uma das URLs acima no navegador para testar.");

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error("❌ Erro: " . $e->getMessage());
            return Command::FAILURE;
        }
    }
}

