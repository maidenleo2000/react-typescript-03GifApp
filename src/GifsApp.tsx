// import React from "react";
import { SearchBar } from "./shared/components/SearchBar";
// import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { GifList } from "./gifs/components/GifList";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermClicked = (term: string) => {
    handleSearch(term);
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
    console.log({ gifs });
    setGifs(gifs);
  };
  return (
    <>
      {/* Header  */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

      {/* Busquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
