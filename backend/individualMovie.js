const dotenv = require("dotenv");
dotenv.config();

async function fetchMovieData(movieName) {
  const formattedName = encodeURIComponent(movieName);
  const url = `https://api.themoviedb.org/3/search/movie?query=${formattedName}&include_adult=false&language=es-US&page=1`;
  const apiKey = "Bearer " + process.env.TMDB_API_KEY;
  console.log(apiKey);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.results.length > 0) {
      const {
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        title,
        release_date,
      } = data.results[0];
      console.log({
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        title,
        release_date,
      });
      return {
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        title,
        release_date,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

// Función principal para procesar la lista de películas y guardar los resultados en un archivo JSON
fetchMovieData(" Huózhe");
