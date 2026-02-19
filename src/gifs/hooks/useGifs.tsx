import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

//TODO pedir al agente que explique esto
//onst gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  //crea espacio en memoria que no causa rerender y mantiene el estado de memoria anterior
  const gifsCache = useRef<Record<string, Gif[]>>({});

  //TODO forma propuesta por Agent
  //   const handleTermClicked = (term: string) => {
  //     handleSearch(term);
  //   };

  //TODO forma hecha por DevTalles
  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      //el .current apunta al estado actual
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string = "") => {
    //console.log({ query });
    // Tarea:
    // Implementar la función handleSearch que debe:
    // Validar que el query no esté vacío
    // Convertir el query a minúsculas y eliminar espacios en blanco
    // Evitar búsquedas duplicadas verificando si el término ya existe en previousTerms ( si existe, no hacer nada )
    // Actualizar previousTerms agregando el nuevo término al inicio y limitando a 8 elementos máximo, es decir no puede ser un arreglo de más de 8.
    const queryClean = query.toLocaleLowerCase().trim();
    if (queryClean.length > 0) {
      if (!previousTerms.includes(queryClean)) {
        if (previousTerms.length == 8) previousTerms.pop();
        setPreviousTerms([queryClean, ...previousTerms]); // --> otra forma setPreviousTerms([queryClean, ...previousTerms].slice(0,7));
      }
    }
    const gifs = await getGifsByQuery(queryClean);
    // console.log({ gifs });
    setGifs(gifs);

    //TODO pedir al agente que explique esto
    gifsCache.current[query] = gifs;
    console.log(gifsCache);
  };
  return {
    //Props
    gifs,
    previousTerms,

    //Metodos
    handleTermClicked,
    handleSearch,
  };
};
