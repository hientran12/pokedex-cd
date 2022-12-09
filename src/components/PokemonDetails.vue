<template>
  <div @click.self="$emit('toggleShowDetails')">
    <div
      class="w-[300px] bg-slate-400 flex flex-col justify-center items-center rounded-md p-4 gap-2"
    >
      <p v-for="key in Object.keys(pokemon.starts)" :key="key">
        <strong>{{ key }}:</strong> {{ pokemon.starts[`${key}`] }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Pokemon } from "@/utils/pokemon";
defineProps<{
  pokemon: Pokemon;
}>();
const emit = defineEmits<{
  (e: "toggleShowDetails"): void;
}>();
</script>
