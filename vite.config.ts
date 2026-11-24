import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { restaurante } from './src/restaurante'

const html = (texto: string) => texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Preenche título, descrição, cores e imagem de compartilhamento do index.html a partir de src/restaurante.ts. */
function dadosDoRestaurante(): Plugin {
  const valores: Record<string, string> = {
    SEO_TITULO: html(restaurante.seo.titulo),
    SEO_DESCRICAO: html(restaurante.seo.descricao),
    MARCA: html(restaurante.nome),
    COR: html(restaurante.cor),
    COR_ESCURA: html(restaurante.corEscura),
    URL: html(restaurante.seo.url),
    OG_IMAGEM: restaurante.seo.imagem
      ? `    <meta property="og:image" content="${html(restaurante.seo.imagem)}" />\n    <meta name="twitter:image" content="${html(restaurante.seo.imagem)}" />`
      : '',
  }
  return {
    name: 'dados-do-restaurante',
    transformIndexHtml: (texto) => texto.replace(/%([A-Z_]+)%/g, (trecho, chave: string) => valores[chave] ?? trecho),
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    dadosDoRestaurante(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
