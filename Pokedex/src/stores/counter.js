import { defineStore } from 'pinia'
import { ref } from 'vue'

export const PokemonPinia = defineStore('pokemonStore', () => {
  const seleccionado = ref([])

  function elegirPokemon(pokemon) {
    if (seleccionado.value.some(p => p.id === pokemon.id)) {
      alert(`Ya has seleccionado a ${pokemon.name}`)
      return
    }

    if (seleccionado.value.length >= 5) {
      alert('No puedes seleccionar más de 5 Pokémon')
      return
    }


    seleccionado.value.push(pokemon)
    alert(`Has seleccionado a ${pokemon.name}`)
  }

  return { seleccionado, elegirPokemon }
})
