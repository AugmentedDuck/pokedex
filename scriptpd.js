LoadPokedex();
const pokemonsRaw = []


async function LoadPokedex() {
  let pokedexData;
  let pokedexJSON;

  try {
    pokedexData = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    pokedexJSON = await pokedexData.json()
    
    BuildPokedexSite(pokedexJSON)
  } catch (error) {
    console.error(error.message)
    let pokedex = document.getElementById("pokedex")
    pokedex.innerHTML = "Something went wrong, try again later"
  }
}

async function BuildPokedexSite(pokedexData) {
  let pokedex = document.getElementById("pokedex")
  
  for (let i = 0; i < pokedexData.results.length; i++) {
    const pokemon = pokedexData.results[i];

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = pokemon.name;

    const image = document.createElement("img");
    image.alt = "Image of " + pokemon.name
    
    try {
      image.src = await GetImage(pokemon);
    } catch (error) {
      console.error(error.message)
    }
    
    pokemonDiv.addEventListener("click", () => GoToPokemon(i + 1));
    
    const idParagraph = document.createElement("p");
    idParagraph.classList.add("idText");
    idParagraph.textContent = "#" + (i + 1);


    pokemonDiv.appendChild(nameParagraph);
    pokemonDiv.appendChild(image)
    pokemonDiv.appendChild(idParagraph)
    pokedex.appendChild(pokemonDiv);

    pokemonsRaw[i] = { id: (i + 1), name: pokemon.name, image: image.src}
  }
}

function GoToPokemon(index) {
  sessionStorage.setItem("pokeID", index)
  window.location.href = "pokeinfo.html"
}

function GoToTeam() {
  window.location.href = "poketeam.html"
}

async function GetImage(pokemon) {
  let pokeData = await fetch(pokemon.url)
  let pokeDataJSON = await pokeData.json()

  return pokeDataJSON.sprites.front_default
}

function PokeSearch() {
  let searchTerm = document.getElementById("searchBar").value;
  let searchResluts = document.getElementById("searchResults");
  let allPokemons = document.getElementById("pokedex")

  console.log(searchTerm)

  if (searchTerm == null || searchTerm == "") {
    allPokemons.classList.remove("hidden")
    searchResluts.classList.add("hidden")
  } else {
    allPokemons.classList.add("hidden")
    searchResluts.classList.remove("hidden")
  }

  const matchingPokemonNames = pokemonsRaw.filter(pokemon => (pokemon.name).toLowerCase().includes(searchTerm.toString().toLowerCase()))
  const matchingPokemonIDs = pokemonsRaw.filter(pokemon => pokemon.id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()))

  const mergedPokemons = matchingPokemonNames.concat(matchingPokemonIDs);

  BuildSearchResults(mergedPokemons, searchResluts)
}

function BuildSearchResults(pokemons, searchResluts) {
  for (let i = 0; i < pokemons.length; i++) {
    
    //<div class="pokemon" onclick="GoToPokemon('${i + 1}')"><p>${pokedexData.results[i].name}<p><div>
    
    const pokemon = pokemons[i];

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = pokemon.name;

    const image = document.createElement("img");
    image.alt = "Image of " + pokemon.name
    image.src = pokemon.image
    
    pokemonDiv.addEventListener("click", () => GoToPokemon(i + 1));
    
    const idParagraph = document.createElement("p");
    idParagraph.classList.add("idText");
    idParagraph.textContent = "#" + pokemon.id;

    pokemonDiv.appendChild(nameParagraph);
    pokemonDiv.appendChild(image)
    pokemonDiv.appendChild(idParagraph)
    searchResluts.appendChild(pokemonDiv);
  }
}