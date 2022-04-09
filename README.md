# Vuepress HTML Applet Plugin

Allow you to embed HTML Applet iframe to your Vuepress article.

## Installation

```shell
yarn add vuepress-html-applet -D
# or
npm i vuepress-html-applet -D
```

## Usage

Add the following to your `config.js`:

```js
module.exports = {
  plugins: [
    'vuepress-html-applet'
  ]
}
```

Write html code in markdown like this:

The first line of the HTML code block needs to contain the string --applet--.

~~~markdown
```html
<!-- --applet-- -->

<div>
  <h1>Hello World</h1>
  <p>This is a simple applet.</p>
</div>
```
~~~

## Example Page

https://blog-purocean.vercel.app/css-quirks/
