<template>
  <div class="layout">
    <header class="header">
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        <g-link to="/send">Send message</g-link>
    </header>
    <slot/>
    <footer>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
html, body {
  margin:0;
  padding:0;
  line-height: 1.5;
  background-color: black;
  color: grey;
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  font-size: 1.2em;
}
.header {
  border: 1px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.contact {
  /* font-family: Roboto Slab; */
  text-align: center;
  float: none;
  position:relative;
  top: auto;
  right:auto;
  width: 100%;
  height: auto;
  line-height: 20px;
}
a, a:visited {
  color: green;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
::selection { background: rgb(25, 139, 40); }
@media screen and (min-width: 650px) {
  body {
    margin: 10px 6em 0 6em;
  }
}
@media screen and (max-width: 649px) {
  p, h1, h2, h3 {
    padding: 0 20px 0 20px;
  }
  p.clarify {
    margin: 0 20px 5px 20px;
  }
  hr {
    margin: 0 20px 0 20px;
  }
}
</style>
