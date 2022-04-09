const path = require('path')
const { escapeHtml } = require('markdown-it/lib/common/utils')
const CopyPlugin = require('copy-webpack-plugin')

const MarkdownItPlugin = ({ useSrcdoc }, ctx) => (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    const firstLine = code.split(/\n/)[0].trim()
    if (token.info !== 'html' || !firstLine.includes('--applet--')) {
      return temp(tokens, idx, options, env, slf)
    }

    const html = `
      <script>
        window.resize = () => {
          const iframe = [...window.parent.document.querySelectorAll('iframe')].find(x => x.contentWindow === window)
          iframe.style.height = iframe.contentDocument.documentElement.scrollHeight + 'px';
        };

        setTimeout(() => {
          window.resize();
        }, 100);

        setTimeout(() => {
          window.resize();
        }, 1000);
      </script>
      <style>
        button { margin-left: 0; }
        input:not([type=checkbox]):not([type=radio]):not([type=range]), textarea, select { margin: 10px 0; }
      </style>

      ${code}
    `

    const style = `border: none; width: 100%; height: 20px;`

    if (useSrcdoc) {
      return `<iframe style="${style}" srcdoc="${escapeHtml(html)}"></iframe>`
    }

    const src = `${ctx.base}${iframeFilename}#html=${encodeURIComponent(html)}`

    return `<iframe style="${style}" src="${src}"></iframe>`
  }
}

const iframeFilename = 'html-applet-iframe.html'

module.exports = (options, ctx) => {
  const { useSrcdoc } = options

  return {
    name: 'vuepress-plugin-html-applet',

    extendMarkdown: md => {
      md.use(MarkdownItPlugin(options, ctx))
    },

    chainWebpack (config) {
      if (!useSrcdoc) {
        config
          .plugin('copy')
          .use(CopyPlugin, [[
            { from: path.join(__dirname, iframeFilename), to: ctx.outDir }
          ]])
      }
    }
  }
}
