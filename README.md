# Psicóloga Patrícia Trindade — Site (redesign)

Site one-page em HTML/CSS/JS puro + Tailwind CSS via CDN. Sem build, sem bundler.
Desenvolvido por [TeoCode](https://teocode.com.br/).

## Estrutura

```
PsicoPatriciaTrindade/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/style.css            # tokens de cor, botões, cards, animações
    ├── js/
    │   ├── config.js            # WhatsApp e IDs de Analytics/Pixel (edite aqui)
    │   └── main.js              # CTAs do WhatsApp, menu, scroll-reveal, tracking
    └── img/
        ├── logo-patricia-trindade.png   # logo ORIGINAL do site atual (intacto)
        ├── logo-recortado.png/.webp     # mesmo logo, só sem a margem branca
        ├── patricia.webp / patricia-sm.webp
        ├── og-image.png                 # preview WhatsApp/Instagram (1200x630)
        └── favicon*.png, favicon.ico, apple-touch-icon.png  # do ícone do logo
```

## Rodar localmente

Abra `index.html` no navegador, ou sirva a pasta:

```bash
python -m http.server 5173
```

Acesse http://localhost:5173.

## Configuração

Em `assets/js/config.js`:

- `whatsapp`: número em formato internacional (`5511971072163`).
- `ga4Id`: ID do Google Analytics 4 (`G-XXXXXXXXXX`). Vazio = não carrega.
- `metaPixelId`: ID do Meta Pixel. Vazio = não carrega.

Todo botão com `data-wa="mensagem"` abre o WhatsApp com aquela mensagem. Com os IDs
preenchidos, cada clique dispara `generate_lead` (GA4) e `Contact` (Pixel), com a
seção de origem em `data-track`.

## Deploy

Site estático, funciona em qualquer hospedagem:

- **GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Vercel / Cloudflare Pages:** conecte o repositório, sem build command, diretório de publicação `/`.
- **Hospedagem tradicional:** envie todos os arquivos para `public_html`.

Depois de publicar, confira se o domínio em `canonical`, `og:url` e `og:image`
(`index.html`) é o definitivo, e teste o preview no
[Debugger do Facebook](https://developers.facebook.com/tools/debug/).

## Pendências de conteúdo

- **E-mail:** não existe no site atual, então foi omitido do rodapé. Adicionar quando o cliente informar.
- **Valores e detalhes dos planos:** o site original não tem planos. Os cards de sessão pontual, 90 e 180 dias não trazem preço nem número de sessões; a conversa é direcionada ao WhatsApp. Atualizar com os dados reais.
- **Analytics/Pixel:** IDs pendentes (ver `config.js`).
- **Avaliações do Google:** copiadas do perfil em 29/09/2026 (nota 5,0, 42 avaliações). São textos estáticos; atualizar manualmente de tempos em tempos.
- **Depoimentos em imagem (prints de WhatsApp) do site antigo:** não foram reaproveitados (exigem autorização dos pacientes).
