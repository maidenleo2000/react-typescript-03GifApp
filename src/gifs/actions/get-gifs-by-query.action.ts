import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";

//con FETCH
// export const getGifsByQuery = async (query: string) => {
//   fetch(
//     `https://api.giphy.com/v1/gifs/search?api_key=83RRXrvJjWf1HJNm2NBEqVNqs53WIL2K&q=${query}&limit=10&lang=es`,
//   );
// };

//con AXIOS
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
    },
  });

  //onsole.log(response.data);

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
