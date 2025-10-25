<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API - Sistema de Pontes e Rodovias | Rondônia</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-color: #003d82;
            --secondary-color: #0056b3;
            --success-color: #1b7339;
            --danger-color: #c8102e;
            --warning-color: #ff7f32;
            --info-color: #17a2b8;
            --light-gray: #f8f9fa;
            --border-color: #dee2e6;
            --text-dark: #212529;
            --text-muted: #6c757d;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 36px;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .header p {
            font-size: 18px;
            opacity: 0.95;
            margin-bottom: 20px;
        }

        .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2);
            font-size: 14px;
            margin: 5px;
            backdrop-filter: blur(10px);
        }

        .content {
            padding: 40px;
        }

        .intro {
            background: var(--light-gray);
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 40px;
            border-left: 4px solid var(--primary-color);
        }

        .intro h2 {
            color: var(--primary-color);
            margin-bottom: 15px;
            font-size: 24px;
        }

        .intro p {
            color: var(--text-dark);
            line-height: 1.6;
            margin-bottom: 10px;
        }

        .base-url {
            background: #fff;
            padding: 15px 20px;
            border-radius: 8px;
            border: 2px solid var(--primary-color);
            font-family: 'Courier New', monospace;
            font-size: 16px;
            margin-top: 15px;
            font-weight: 600;
            color: var(--primary-color);
        }

        .section {
            margin-bottom: 50px;
        }

        .section-title {
            color: var(--primary-color);
            font-size: 28px;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 3px solid var(--primary-color);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-icon {
            font-size: 32px;
        }

        .endpoint-group {
            margin-bottom: 30px;
        }

        .endpoint {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin-bottom: 15px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .endpoint:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        .endpoint-header {
            padding: 15px 20px;
            background: var(--light-gray);
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
        }

        .method {
            padding: 6px 12px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            min-width: 65px;
            text-align: center;
        }

        .method-get { background: var(--info-color); color: white; }
        .method-post { background: var(--success-color); color: white; }
        .method-put { background: var(--warning-color); color: white; }
        .method-delete { background: var(--danger-color); color: white; }

        .endpoint-path {
            font-family: 'Courier New', monospace;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-dark);
            flex: 1;
        }

        .endpoint-description {
            color: var(--text-muted);
            font-size: 14px;
        }

        .endpoint-details {
            padding: 20px;
            border-top: 1px solid var(--border-color);
            display: none;
        }

        .endpoint.expanded .endpoint-details {
            display: block;
        }

        .detail-section {
            margin-bottom: 20px;
        }

        .detail-title {
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 10px;
            font-size: 16px;
        }

        .code-block {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            overflow-x: auto;
            line-height: 1.5;
        }

        .code-block .key { color: #66d9ef; }
        .code-block .string { color: #a6e22e; }
        .code-block .number { color: #ae81ff; }
        .code-block .comment { color: #75715e; }

        .param-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .param-table th,
        .param-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        .param-table th {
            background: var(--light-gray);
            font-weight: 600;
            color: var(--primary-color);
        }

        .required {
            color: var(--danger-color);
            font-size: 12px;
            font-weight: 700;
        }

        .optional {
            color: var(--text-muted);
            font-size: 12px;
        }

        .auth-note {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-top: 15px;
            border-radius: 4px;
        }

        .auth-note strong {
            color: #856404;
        }

        .footer {
            background: var(--light-gray);
            padding: 30px;
            text-align: center;
            border-top: 1px solid var(--border-color);
        }

        .footer p {
            color: var(--text-muted);
            margin-bottom: 10px;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 15px;
        }

        .footer-link {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
        }

        .footer-link:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .header h1 { font-size: 28px; }
            .header p { font-size: 16px; }
            .content { padding: 20px; }
            .endpoint-header { flex-direction: column; align-items: flex-start; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🌉 API - Sistema de Pontes e Rodovias</h1>
            <p>Governo do Estado de Rondônia</p>
            <div>
                <span class="badge">Versão 1.0.0</span>
                <span class="badge">RESTful API</span>
                <span class="badge">Laravel 11.x</span>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Introdução -->
            <div class="intro">
                <h2>📖 Introdução</h2>
                <p>Bem-vindo à documentação da API do Sistema de Gestão de Pontes e Rodovias de Rondônia.</p>
                <p>Esta API RESTful permite gerenciar informações sobre rodovias estaduais, pontes, municípios e estados através de endpoints HTTP padronizados.</p>
                <p><strong>Base URL:</strong></p>
                <div class="base-url">http://localhost:8080/api</div>
            </div>

            <!-- Autenticação -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">🔐</span>
                    Autenticação
                </h2>
                <p style="margin-bottom: 20px;">A API utiliza Laravel Sanctum para autenticação via tokens Bearer. A maioria dos endpoints requer autenticação.</p>

                <!-- Register -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-post">POST</span>
                        <span class="endpoint-path">/api/register</span>
                        <span class="endpoint-description">Criar nova conta de usuário</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Parâmetros (Body - JSON):</div>
                            <table class="param-table">
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipo</th>
                                    <th>Descrição</th>
                                </tr>
                                <tr>
                                    <td>name <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Nome completo do usuário</td>
                                </tr>
                                <tr>
                                    <td>email <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Email válido e único</td>
                                </tr>
                                <tr>
                                    <td>password <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Senha (mínimo 8 caracteres)</td>
                                </tr>
                            </table>
                        </div>
                        <div class="detail-section">
                            <div class="detail-title">Exemplo de Request:</div>
                            <pre class="code-block">{
  <span class="key">"name"</span>: <span class="string">"João Silva"</span>,
  <span class="key">"email"</span>: <span class="string">"joao@example.com"</span>,
  <span class="key">"password"</span>: <span class="string">"senha123"</span>
}</pre>
                        </div>
                        <div class="detail-section">
                            <div class="detail-title">Resposta de Sucesso (201):</div>
                            <pre class="code-block">{
  <span class="key">"user"</span>: { <span class="key">"id"</span>: <span class="number">1</span>, <span class="key">"name"</span>: <span class="string">"João Silva"</span>, ... },
  <span class="key">"token"</span>: <span class="string">"1|abc123..."</span>
}</pre>
                        </div>
                    </div>
                </div>

                <!-- Login -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-post">POST</span>
                        <span class="endpoint-path">/api/login</span>
                        <span class="endpoint-description">Fazer login e obter token</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Parâmetros (Body - JSON):</div>
                            <table class="param-table">
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipo</th>
                                    <th>Descrição</th>
                                </tr>
                                <tr>
                                    <td>email <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Email do usuário</td>
                                </tr>
                                <tr>
                                    <td>password <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Senha do usuário</td>
                                </tr>
                            </table>
                        </div>
                        <div class="detail-section">
                            <div class="detail-title">Exemplo de Request:</div>
                            <pre class="code-block">{
  <span class="key">"email"</span>: <span class="string">"admin@rondonia.gov.br"</span>,
  <span class="key">"password"</span>: <span class="string">"password"</span>
}</pre>
                        </div>
                        <div class="detail-section">
                            <div class="detail-title">Resposta de Sucesso (200):</div>
                            <pre class="code-block">{
  <span class="key">"user"</span>: { <span class="key">"id"</span>: <span class="number">1</span>, <span class="key">"name"</span>: <span class="string">"Administrador"</span>, ... },
  <span class="key">"token"</span>: <span class="string">"1|abc123..."</span>
}</pre>
                        </div>
                        <div class="auth-note">
                            <strong>💡 Dica:</strong> Use o token recebido no header <code>Authorization: Bearer {token}</code> para acessar endpoints protegidos.
                        </div>
                    </div>
                </div>

                <!-- Logout -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-post">POST</span>
                        <span class="endpoint-path">/api/logout</span>
                        <span class="endpoint-description">Fazer logout e invalidar token</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="auth-note">
                            <strong>🔒 Autenticação:</strong> Este endpoint requer autenticação. Inclua o header <code>Authorization: Bearer {token}</code>
                        </div>
                        <div class="detail-section">
                            <div class="detail-title">Resposta de Sucesso (200):</div>
                            <pre class="code-block">{
  <span class="key">"message"</span>: <span class="string">"Logged out successfully"</span>
}</pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rodovias -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">🛣️</span>
                    Rodovias
                </h2>
                <div class="auth-note" style="margin-bottom: 20px;">
                    <strong>🔒 Todos os endpoints de Rodovias requerem autenticação.</strong>
                </div>

                <!-- GET Rodovias -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-get">GET</span>
                        <span class="endpoint-path">/api/rodovias</span>
                        <span class="endpoint-description">Listar todas as rodovias</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Resposta de Sucesso (200):</div>
                            <pre class="code-block">[
  {
    <span class="key">"id"</span>: <span class="number">1</span>,
    <span class="key">"nome"</span>: <span class="string">"RO-010"</span>,
    <span class="key">"trecho_inicial"</span>: <span class="string">"Porto Velho"</span>,
    <span class="key">"trecho_final"</span>: <span class="string">"Rio Pardo"</span>,
    <span class="key">"extensao_km"</span>: <span class="string">"120.00"</span>,
    <span class="key">"situacao"</span>: <span class="string">"Regular"</span>
  }
]</pre>
                        </div>
                    </div>
                </div>

                <!-- GET Rodovia by ID -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-get">GET</span>
                        <span class="endpoint-path">/api/rodovias/{id}</span>
                        <span class="endpoint-description">Buscar rodovia por ID</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Parâmetros (URL):</div>
                            <table class="param-table">
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipo</th>
                                    <th>Descrição</th>
                                </tr>
                                <tr>
                                    <td>id <span class="required">*</span></td>
                                    <td>integer</td>
                                    <td>ID da rodovia</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- POST Rodovia -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-post">POST</span>
                        <span class="endpoint-path">/api/rodovias</span>
                        <span class="endpoint-description">Criar nova rodovia</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Parâmetros (Body - JSON):</div>
                            <table class="param-table">
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipo</th>
                                    <th>Descrição</th>
                                </tr>
                                <tr>
                                    <td>nome <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Nome da rodovia (ex: RO-010)</td>
                                </tr>
                                <tr>
                                    <td>trecho_inicial <span class="optional">(opcional)</span></td>
                                    <td>string</td>
                                    <td>Ponto inicial da rodovia</td>
                                </tr>
                                <tr>
                                    <td>trecho_final <span class="optional">(opcional)</span></td>
                                    <td>string</td>
                                    <td>Ponto final da rodovia</td>
                                </tr>
                                <tr>
                                    <td>extensao_km <span class="optional">(opcional)</span></td>
                                    <td>decimal</td>
                                    <td>Extensão em quilômetros</td>
                                </tr>
                                <tr>
                                    <td>situacao <span class="optional">(opcional)</span></td>
                                    <td>string</td>
                                    <td>Boa, Regular ou Ruim</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- PUT Rodovia -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-put">PUT</span>
                        <span class="endpoint-path">/api/rodovias/{id}</span>
                        <span class="endpoint-description">Atualizar rodovia</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Mesmos parâmetros do POST, todos opcionais.</div>
                        </div>
                    </div>
                </div>

                <!-- DELETE Rodovia -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-delete">DELETE</span>
                        <span class="endpoint-path">/api/rodovias/{id}</span>
                        <span class="endpoint-description">Excluir rodovia</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Resposta de Sucesso (204):</div>
                            <pre class="code-block"><span class="comment">// Sem conteúdo</span></pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pontes -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">🌉</span>
                    Pontes
                </h2>
                <div class="auth-note" style="margin-bottom: 20px;">
                    <strong>🔒 Todos os endpoints de Pontes requerem autenticação.</strong>
                </div>

                <!-- GET Pontes -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-get">GET</span>
                        <span class="endpoint-path">/api/pontes</span>
                        <span class="endpoint-description">Listar todas as pontes</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Resposta de Sucesso (200):</div>
                            <pre class="code-block">[
  {
    <span class="key">"id"</span>: <span class="number">1</span>,
    <span class="key">"nome"</span>: <span class="string">"Ponte do Rio Madeira"</span>,
    <span class="key">"rodovia_id"</span>: <span class="number">1</span>,
    <span class="key">"rio"</span>: <span class="string">"Madeira"</span>,
    <span class="key">"km"</span>: <span class="string">"10.5"</span>,
    <span class="key">"latitude"</span>: <span class="string">"-8.7608"</span>,
    <span class="key">"longitude"</span>: <span class="string">"-63.8999"</span>,
    <span class="key">"situacao"</span>: <span class="string">"Boa"</span>,
    <span class="key">"foto_url"</span>: <span class="string">"http://..."</span>
  }
]</pre>
                        </div>
                    </div>
                </div>

                <!-- POST Ponte -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-post">POST</span>
                        <span class="endpoint-path">/api/pontes</span>
                        <span class="endpoint-description">Criar nova ponte (com foto)</span>
                    </div>
                    <div class="endpoint-details">
                        <div class="detail-section">
                            <div class="detail-title">Content-Type: multipart/form-data</div>
                            <table class="param-table">
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipo</th>
                                    <th>Descrição</th>
                                </tr>
                                <tr>
                                    <td>nome <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Nome da ponte</td>
                                </tr>
                                <tr>
                                    <td>rodovia_id <span class="required">*</span></td>
                                    <td>integer</td>
                                    <td>ID da rodovia</td>
                                </tr>
                                <tr>
                                    <td>rio <span class="required">*</span></td>
                                    <td>string</td>
                                    <td>Nome do rio</td>
                                </tr>
                                <tr>
                                    <td>km <span class="optional">(opcional)</span></td>
                                    <td>decimal</td>
                                    <td>Quilômetro na rodovia</td>
                                </tr>
                                <tr>
                                    <td>latitude <span class="optional">(opcional)</span></td>
                                    <td>decimal</td>
                                    <td>Coordenada de latitude</td>
                                </tr>
                                <tr>
                                    <td>longitude <span class="optional">(opcional)</span></td>
                                    <td>decimal</td>
                                    <td>Coordenada de longitude</td>
                                </tr>
                                <tr>
                                    <td>material <span class="optional">(opcional)</span></td>
                                    <td>string</td>
                                    <td>Material da ponte</td>
                                </tr>
                                <tr>
                                    <td>situacao <span class="optional">(opcional)</span></td>
                                    <td>string</td>
                                    <td>Boa, Regular, Ruim, Interditada</td>
                                </tr>
                                <tr>
                                    <td>foto <span class="optional">(opcional)</span></td>
                                    <td>file</td>
                                    <td>Imagem (JPG, PNG, GIF, WebP - máx 5MB)</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Estados e Municípios -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">📍</span>
                    Estados e Municípios
                </h2>
                <p style="margin-bottom: 20px; color: var(--success-color); font-weight: 600;">✅ Endpoints públicos - não requerem autenticação</p>

                <!-- GET Estados -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-get">GET</span>
                        <span class="endpoint-path">/api/estados</span>
                        <span class="endpoint-description">Listar todos os estados</span>
                    </div>
                </div>

                <!-- GET Municípios -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-get">GET</span>
                        <span class="endpoint-path">/api/municipios</span>
                        <span class="endpoint-description">Listar todos os municípios</span>
                    </div>
                </div>

                <!-- GET Municípios por Estado -->
                <div class="endpoint">
                    <div class="endpoint-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="method method-get">GET</span>
                        <span class="endpoint-path">/api/estados/{id}/municipios</span>
                        <span class="endpoint-description">Listar municípios de um estado</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Sistema de Gestão de Pontes e Rodovias</strong></p>
            <p>Governo do Estado de Rondônia | Versão 1.0.0</p>
            <div class="footer-links">
                <a href="http://localhost:3000" class="footer-link">🏠 Frontend</a>
                <a href="http://localhost:8080" class="footer-link">⚙️ Backend</a>
                <a href="https://github.com" class="footer-link">📚 GitHub</a>
            </div>
            <p style="margin-top: 15px; font-size: 12px;">Desenvolvido com ❤️ | © 2025</p>
        </div>
    </div>

    <script>
        // Expandir primeiro endpoint de cada seção por padrão
        document.addEventListener('DOMContentLoaded', function() {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const firstEndpoint = section.querySelector('.endpoint');
                if (firstEndpoint) {
                    firstEndpoint.classList.add('expanded');
                }
            });
        });
    </script>
</body>
</html>

