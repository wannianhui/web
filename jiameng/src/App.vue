<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
  /* color: #2c3e50; */
}
/* body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
/* dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
/*pre, 
fieldset, lengend, button, input, textarea, 
th, td {
  margin: 0;
  padding: 0;
} */
/* input {
  text-emphasis: none;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
} */
/*包含以下四种的链接*/
/* a {
  color: black;
  text-decoration: none;
} */
/*正常的未被访问过的链接*/
/* a:link {
  text-decoration: none;
} */
/*已经访问过的链接*/
/* a:visited {
  text-decoration: none;
} */
/*鼠标划过(停留)的链接*/
/* a:hover {
  text-decoration: none;
} */
/* 正在点击的链接*/
/* a:active {
  text-decoration: none;
}  */
</style>
