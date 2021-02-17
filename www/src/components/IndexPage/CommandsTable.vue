<template>
  <div class="commands">
    <h3>Commands</h3>
    <table>
      <thead>
        <tr>
          <th>Command</th>
          <th>Syntax</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="edge in $static.commands.edges" :key="edge.node.id">
          <td>{{ edge.node.name }}</td>
          <td>{{ edge.node.syntax }}</td>
          <td>{{ edge.node.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<static-query>
query {
    commands: allCommand {
        edges {
            node {
                id
                name
                syntax
                description
            }
        }
    }
}
</static-query>

<style scoped>
table {
  font-size: 0.8em;
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 50px;
}
th {
  padding: 10px;
  background-color: rgb(50, 50, 50);
  color: black;
}
td {
  border-bottom: 1px solid grey;
  height: 2em;
  padding: 5px 10px 5px 10px;
}
tr:nth-child(even) {background-color: #ffffff0A;}
</style>
