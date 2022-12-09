<template>
  <div
    class="w-[300px] bg-slate-400 flex flex-col justify-center items-center rounded-md p-4"
    @click="toggleShowDetails"
  >
    <img
      :src="pokemon.imgUrl"
      :alt="pokemon.name"
      class="w-[80%]"
      v-if="!isShowDetails"
    />
    <p class="font-semibold text-xl">{{ pokemon.name }}</p>
    <p>ID: {{ pokemon.id }}</p>
    <PokemonDetails
      v-if="isShowDetails"
      :pokemon="pokemon"
      @toggle-show-details="toggleShowDetails"
    ></PokemonDetails>
    <div class="flex flex-row justify-center items-center w-full gap-x-2">
      <div
        v-for="type in pokemon.types"
        :key="type"
        class="w-[40%] flex flex-col justify-center items-center border-2 border-white rounded-md bg-white"
      >
        <p>{{ type }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Pokemon } from "@/utils/pokemon";
import PokemonDetails from "./PokemonDetails.vue";
import { ref } from "@vue/reactivity";
defineProps<{
  pokemon: Pokemon;
}>();
const isShowDetails = ref(false);
const toggleShowDetails = () => {
  isShowDetails.value = !isShowDetails.value;
};
</script>
