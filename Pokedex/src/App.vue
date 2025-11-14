<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div class="wrapper">

      <nav>
        <RouterLink to="/EquipoView">EquipoView</RouterLink>
        <RouterLink to="/PokedexList">PokedexList</RouterLink>
      </nav>
    </div>

  <RouterView />
</template>

<style scoped>


</style>
