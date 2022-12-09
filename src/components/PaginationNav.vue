<template>
  <div class="flex flex-row justify-between items-center w-full py-4">
    <button
      class="border-black bg-black text-white uppercase min-w-[100px] h-[50px] font-semibold"
      @click="emit('goPrevious')"
    >
      Previous
    </button>
    <p>Page: {{ pageMetaData.pageIndex }}</p>
    <button
      class="border-black bg-black text-white uppercase min-w-[100px] h-[50px] font-semibold"
      @click="$emit('goNext')"
    >
      Next
    </button>
  </div>
</template>
<script setup lang="ts">
import { PageMetaData } from "@/utils/pokemon";
defineProps<{
  pageMetaData: PageMetaData;
}>();
const emit = defineEmits<{
  (e: "goNext"): void;
  (e: "goPrevious"): void;
}>();
</script>
