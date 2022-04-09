const { escapeHtml } = require('markdown-it/lib/common/utils')

const MarkdownItPlugin = (md) => {
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

    return `<iframe
      style="border: none; width: 100%; height: 20px;"
      srcdoc="${escapeHtml(html)}"
    ></iframe>`
  }
}

module.exports = (options, ctx) => {
  return {
    name: 'vuepress-plugin-html-applet',

    extendMarkdown: md => {
      md.use(MarkdownItPlugin)
    },
  }
}
