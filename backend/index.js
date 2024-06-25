const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// Función para leer el archivo y devolver un array de nombres de películas
function readMovieListFile(filePath) {
  return fs.readFileSync(filePath, "utf8").split("\n").filter(Boolean);
}

// Función para realizar la solicitud a la API y obtener los datos necesarios
async function fetchMovieData(movieName) {
  const formattedName = encodeURIComponent(movieName);
  const url = `https://api.themoviedb.org/3/search/movie?query=${formattedName}&include_adult=false&language=es-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + process.env.TMDB_API_KEY,
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
async function processMovies(filePath) {
  const movies = readMovieListFile(filePath);
  const results = [];

  for (const [index, movieName] of movies.entries()) {
    const movieData = await fetchMovieData(movieName);
    if (movieData) {
      movieData.list_id = index + 1;
      movieData.seen = false;
      results.push(movieData);
    }
  }

  fs.writeFileSync("movies.json", JSON.stringify(results, null, 2), "utf8");
  console.log("Archivo movies.json generado con éxito.");
}

// Reemplazar 'movie-list.txt' con la ruta correcta al archivo de lista de películas
processMovies("../movie-list.txt");
