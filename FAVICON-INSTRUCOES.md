# 🎨 Instruções para Atualizar o Favicon

## 📍 Localização da Imagem do Brasão

A imagem do brasão de Rondônia que você forneceu precisa ser convertida e colocada nos seguintes locais:

## 🔧 Passo a Passo

### 1. Converter a Imagem para ICO

Para criar o arquivo `favicon.ico`, você pode usar uma das ferramentas online:

- **Favicon.io**: https://favicon.io/favicon-converter/
- **RealFaviconGenerator**: https://realfavicongenerator.net/
- **ConvertICO**: https://convertico.com/

**Passos:**
1. Acesse uma das ferramentas acima
2. Faça upload da imagem do brasão de Rondônia
3. Configure os tamanhos: 16x16, 32x32, 48x48, 64x64
4. Baixe o arquivo `favicon.ico` gerado

### 2. Substituir os Arquivos

**Arquivo Principal (Obrigatório):**

```bash
frontend/public/favicon.ico
```
Substitua este arquivo pelo `favicon.ico` que você gerou.

**Arquivo de Backup (Backend Laravel):**

```bash
public/favicon.ico
```
Também substitua este arquivo (usado quando acessar diretamente o backend).

### 3. Arquivos Já Configurados

Os seguintes arquivos já foram atualizados para usar o favicon:

✅ `frontend/public/index.html` - Configurado para carregar o favicon
✅ `frontend/public/manifest.json` - Metadados da aplicação PWA
✅ Referências ao `logo-rondonia.jpg` já configuradas

### 4. Testar o Favicon

Após substituir os arquivos:

1. **Limpar cache do navegador:**
   - Chrome: `Ctrl + Shift + Delete` ou `Cmd + Shift + Delete` (Mac)
   - Ou abra em modo anônimo

2. **Reiniciar o frontend (se necessário):**
   ```bash
   docker-compose restart react
   ```

3. **Verificar:**
   - Acesse http://localhost:3000
   - Verifique se o brasão de Rondônia aparece na aba do navegador

## 🎯 Estrutura Esperada

```
frontend/public/
├── favicon.ico           ← Brasão de Rondônia (16x16, 32x32, 48x48, 64x64)
├── logo-rondonia.jpg     ← Imagem já existente
├── index.html            ← Já configurado ✅
└── manifest.json         ← Já configurado ✅

public/
└── favicon.ico           ← Mesmo arquivo do frontend
```

## 💡 Alternativa Rápida (Usando a Imagem PNG)

Se você não quiser converter para ICO, pode:

1. Salvar a imagem como `brasao-rondonia.png` em `frontend/public/`
2. Editar `frontend/public/index.html` linha 5:

```html
<!-- Antes -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

<!-- Depois -->
<link rel="icon" type="image/png" href="%PUBLIC_URL%/brasao-rondonia.png" />
```

## ✅ Verificação Final

Após aplicar as mudanças, você deve ver:

- 🎨 Brasão de Rondônia na aba do navegador
- 🎨 Brasão de Rondônia ao adicionar aos favoritos
- 🎨 Brasão de Rondônia em PWA (se instalar como app)

---

**Nota:** O arquivo da imagem não pode ser incluído automaticamente no código, pois precisa ser convertido para o formato adequado. Use uma das ferramentas mencionadas acima para gerar o arquivo `favicon.ico` a partir da imagem do brasão.

