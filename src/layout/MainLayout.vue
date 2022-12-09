<template>
  <div
    class="bg-slate-200 w-full h-full absolute flex flex-col justify-center items-center p-4 gap-y-2"
  >
    <h1 class="font-extrabold text-5xl">Pokedex</h1>
    <div class="container w-[90%] h-[90%] p-4 overflow-y-scroll">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.container {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
