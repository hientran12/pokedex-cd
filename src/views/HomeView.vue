<template>
  <MainLayout
    ><div>
      <PaginationNav
        :page-meta-data="pageData"
        @go-next="goNext"
        @go-previous="goPrevious"
      ></PaginationNav>
      <SearchBar @search="search"></SearchBar>
      <div
        class="flex flex-row justify-center flex-wrap w-full gap-4 max-h-[100%]"
      >
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div></div
  ></MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import MainLayout from "@/layout/MainLayout.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import PaginationNav from "@/components/PaginationNav.vue";
import SearchBar from "@/components/SearchBar.vue";
import { PageMetaData, Pokemon } from "@/utils/pokemon";

const pageData = ref({
  pageIndex: 0,
  apiUrl: "https://pokeapi.co/api/v2/pokemon",
  next: "",
  prev: "",
} as PageMetaData);
const totalPokemon = ref(0);
const pokemons = ref<Pokemon[]>([]);
const updatePageData = (
  pIndex: number,
  apiUrl: string,
  next: string,
  prev: string
) => {
  pageData.value = {
    pageIndex: pIndex,
    apiUrl: apiUrl,
    next: next,
    prev: prev,
  };
};
const currPage = ref(0);
const fetchData = async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  const data = await response.text();
  const jsonData = JSON.parse(data);
  totalPokemon.value = jsonData["count"];
  const next = jsonData["next"] ? jsonData["next"] : "";
  const prev = jsonData["previous"] ? jsonData["previous"] : "";
  updatePageData(currPage.value, apiUrl, next, prev);
  pokemons.value = [];
  const results = jsonData["results"] as [{ name: string; url: string }];
  await results.map(async (result) => {
    await fetchPokemonInSingleApi(result["url"]);
  });
  pokemons.value = pokemons.value.sort((a, b) => {
    return a.id - b.id;
  });
};
const fetchPokemonInSingleApi = async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  if (response.ok) {
    const data = await response.text();
    const jsonData = JSON.parse(data);
    const name = jsonData["name"];
    const id = apiUrl.split("/").slice(-2)[0];
    const imgUrl =
      jsonData["sprites"]["other"]["official-artwork"]["front_default"];
    const types = (jsonData["types"] as [{ type: { name: string } }]).map(
      (type) => type["type"]["name"]
    );
    const starts = jsonData["stats"] as [
      { base_stat: number; stat: { name: string } }
    ];
    const hp = starts.find(
      (start) => start["stat"]["name"] === "hp"
    )?.base_stat;
    const atk = starts.find(
      (start) => start["stat"]["name"] === "attack"
    )?.base_stat;
    const def = starts.find(
      (start) => start["stat"]["name"] === "defense"
    )?.base_stat;
    const sAtk = starts.find(
      (start) => start["stat"]["name"] === "special-attack"
    )?.base_stat;
    const sDef = starts.find(
      (start) => start["stat"]["name"] === "special-defense"
    )?.base_stat;
    const speed = starts.find(
      (start) => start["stat"]["name"] === "speed"
    )?.base_stat;

    const pokemon: Pokemon = {
      name: name,
      imgUrl: imgUrl,
      id: id,
      types: types,
      starts: {
        hp: hp ? hp : 0,
        attackt: atk ? atk : 0,
        defense: def ? def : 0,
        specialAttackt: sAtk ? sAtk : 0,
        specialDefense: sDef ? sDef : 0,
        speed: speed ? speed : 0,
      },
    };
    pokemons.value.push(pokemon);
  } else {
    console.log("Not found");
  }
};

const goNext = () => {
  if (pageData.value.next === "") return;
  currPage.value = currPage.value + 1;
  fetchData(pageData.value.next);
};
const goPrevious = () => {
  if (pageData.value.prev === "") return;
  currPage.value = currPage.value - 1;
  fetchData(pageData.value.prev);
};

const search = async (val: string) => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${val.toLocaleLowerCase()}`;
  const oldSize = pokemons.value.length;
  await fetchPokemonInSingleApi(apiUrl);
  if (pokemons.value.length === oldSize) {
    alert("Pokemon is not found");
  } else {
    pokemons.value = Array.of(pokemons.value[oldSize]);
  }
};
onMounted(async () => {
  fetchData(pageData.value.apiUrl);
});
</script>
