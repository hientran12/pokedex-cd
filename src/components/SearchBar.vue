<template>
  <div
    class="w-full flex flex-row flex-nowrap justify-center items-center py-4"
  >
    <input
      type="text"
      v-model="searchVal"
      class="w-[30%] h-[50px] px-4"
      placeholder="Enter pokemon name or index"
    />
    <button
      class="border-black bg-black text-white uppercase min-w-[100px] h-[50px] font-semibold"
      @click="$emit('search', searchVal)"
    >
      Search
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";

const emit = defineEmits<{
  (e: "search", value: string): void;
}>();
const searchVal = ref("");
</script>
