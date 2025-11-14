<script setup>
import { PokemonPinia } from '@/stores/counter.js'

const piniaStore = PokemonPinia()

import { ref, onMounted } from 'vue'
var equipo = ref('')

var listadoPokemon = ref([])

async function guardar() {
  const MiEquipo = {
    nombre : equipo.value,
    pokemones: piniaStore.seleccionado.map(p=>p.name)

  }
  try {
    const respuesta = await axios.post('http:localhost:3000/api/guardar', MiEquipo)
    if(respuesta.data.succes){
      listadoPokemon.value.push(MiEquipo)
      console.log("Agregado correctamente")
    }else{
      console.log("Error de la api")
    }
  } catch (error) {
    console.error('Error al cargar Pokémon:', error)
  }
}

async function MostrarEquipo() {
  try {
    const respuesta = await axios.get('http://localhost:3000/api/listado')
    listadoPokemon.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar Pokémon:', error)
  }
}

onMounted(MostrarEquipo)
</script>

<template>
  <div class="seleccionados-container">
    <h1 class="titulo">Pokémon Seleccionados</h1>

    <div v-if="piniaStore.seleccionado.length > 0" class="pokemon-list">
      <div
        class="pokemon-card"
        v-for="pokemon in piniaStore.seleccionado"
        :key="pokemon.id"
      >
        <h2 class="pokemon-name">{{ pokemon.id }} {{ pokemon.name }}</h2>
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="pokemon-image"
        />
      </div>
    </div>

    <div v-else class="vacio">
      <p>No has seleccionado ningún Pokémon todavía.</p>
    </div>
  </div>

  <form action="" @submit="guardar()">
    <label for="">Nombre del equipo</label>
    <input type="text" v-model="equipo"/>
    <input type="submit" value="Guardar equipo" />
  </form>

  <div>
    
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.seleccionados-container {
  background-image: url('https://wallpapers.com/images/hd/pokemon-background-5qxzfvs1cazmoi2a.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  padding: 30px;
  text-align: center;
  color: #fff;
}

.titulo {
  font-family: 'Press Start 2P', cursive;
  color: #ffde00;
  text-shadow: 2px 2px 0px #3b4cca;
  font-size: 28px;
  margin-bottom: 30px;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.pokemon-card {
  background-color: #f4f4f4;
  border: 3px solid #3b4cca;
  border-radius: 15px;
  width: 160px;
  text-align: center;
  padding: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
}

.pokemon-name {
  text-transform: capitalize;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #3b4cca;
  margin-bottom: 10px;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.vacio {
  font-family: 'Press Start 2P', cursive;
  color: #ffcb05;
  text-shadow: 2px 2px 0px #3b4cca;
  font-size: 12px;
  margin-top: 40px;
}
</style>
