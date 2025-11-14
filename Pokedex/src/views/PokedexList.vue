<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { PokemonPinia } from '@/stores/counter.js'


const listadoPokemon = ref([])
const piniaStore = PokemonPinia()

function Elegir(pokemon) {
  piniaStore.elegirPokemon(pokemon)

}


async function Mostrar() {
  try {
    const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    listadoPokemon.value = respuesta.data.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }))
  } catch (error) {
    console.error('Error al cargar Pokémon:', error)
  }
}


onMounted(Mostrar)
</script>

<template>
  <div class="pokedex-container">
    <h1 class="titulo">Pokédex</h1>
    <div class="pokemon-list">
      <div
        class="pokemon-card"
        v-for="i in listadoPokemon" :key="i.id"
      >
        <h2 class="pokemon-name">{{i.id}} {{ i.name }}</h2>
        <img 
          :src="i.image"
          :alt="i.name"
          class="pokemon-image"
        />
        <input type="button" value="Añadir" @click="Elegir(i)" class="btn-añadir"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.pokedex-container {
  background-image: url('https://wallpapers.com/images/hd/pokemon-background-5qxzfvs1cazmoi2a.jpg');
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 30px;
  text-align: center;
  color: #fff;
}

.titulo {
  font-family: 'Press Start 2P', cursive;
  color: #ffde00;
  text-shadow: 2px 2px 0px #3b4cca;
  font-size: 32px;
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

.btn-añadir {
  background-color: #ffcb05;
  border: 2px solid #3b4cca;
  color: #2a75bb;
  padding: 6px 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-añadir:hover {
  background-color: #3b4cca;
  color: #fff;
}
</style>
