<template>
  <v-row align="center" justify="center">
    <img :src="src" alt="covid">
  </v-row>
</template>
<script>
  import covid from "../assets/covid.gif"
  export default {
    name: "loader",
    data: () => ({
      src: covid
    })
  }
</script>