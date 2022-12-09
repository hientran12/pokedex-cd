export type PageMetaData = {
  pageIndex: number;
  apiUrl: string;
  next: string;
  prev: string;
};

export type Pokemon = {
  name: string;
  imgUrl: string;
  id: string;
  types: string[];
  starts: {
    hp: number;
    attackt: number;
    defense: number;
    specialAttackt: number;
    specialDefense: number;
    speed: number;
  };
};

export const getPokemons = (index: number): Pokemon[] => {
  return [] as Pokemon[];
};
