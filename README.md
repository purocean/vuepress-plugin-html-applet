# Vuepress HTML Applet Plugin

Embed HTML Applet iframe to your Vuepress article.

## Installation

```shell
yarn add vuepress-plugin-html-applet -D
# or
npm i vuepress-plugin-html-applet -D
```

## Usage

Add the following to your `config.js`:

```js
module.exports = {
  plugins: [
    'html-applet',
    // or
    // ['html-applet', { useSrcdoc: true }],
  ]
}
```

Write html code in markdown like this:

The first line of the HTML code block needs to contain the string `--applet--`.

~~~markdown
```html
<!-- --applet-- -->

<div>
  <h1>Hello World</h1>
  <p>This is a simple applet.</p>
</div>
```
~~~

## Options

- `useSrcdoc`: whether to use `srcdoc` attribute instead of `src`. Default is `false`.

## Example Page

https://blog-purocean.vercel.app/css-quirks/
