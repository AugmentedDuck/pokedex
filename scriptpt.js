BuildTeamSite(loadTeam())

const totalStats = [0, 0, 0, 0, 0, 0]

function GoBack() {
  window.location.href = "index.html"
}

async function BuildTeamSite(teamIDs) {
  const teamList = document.getElementById("teamList");
  const team = []
  const teamTypes = []
  
  let typeIndex = 0
  for (let i = 0; i < teamIDs.length; i++) {
    const teamID = teamIDs[i];

    team[i] = await GetPokemon(teamID)

    team[i].types.forEach(element => {
      teamTypes[typeIndex] = element.type.name
      typeIndex++;
    });

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = team[i].name;

    const image = document.createElement("img");
    image.alt = "Image of " + team[i].name
    image.src = team[i].sprites.front_default;
    
    pokemonDiv.appendChild(nameParagraph);
    pokemonDiv.appendChild(image)
    teamList.appendChild(pokemonDiv);

    for (let j = 0; j < totalStats.length; j++) {
      totalStats[j] += team[i].stats[j].base_stat
    }

    console.log(totalStats)
  }

  const typeCountObj = {};

  teamTypes.forEach((string) => {
    if (typeCountObj[string]) {
        typeCountObj[string]++;
    } else {
        typeCountObj[string] = 1;
    }
  });
  
  CreateTypeInfo(typeCountObj);
}

function CreateTypeInfo(typeDict) {
  let typeList = document.getElementById("teamTypes")
  for (const key in typeDict) {
    const typeDiv = document.createElement("div");
    typeDiv.classList.add("pokemon");
    typeDiv.classList.add(key);


    const typeParagraph = document.createElement("p");
    typeParagraph.textContent = typeDict[key] + "x " + key;

    typeDiv.appendChild(typeParagraph)
    typeList.appendChild(typeDiv)
  }

  document.getElementById("pokeHP").innerHTML += totalStats[0]
  document.getElementById("pokeATK").innerHTML += totalStats[1]
  document.getElementById("pokeDEF").innerHTML += totalStats[2]
  document.getElementById("pokeSPATK").innerHTML += totalStats[3]
  document.getElementById("pokeSPDEF").innerHTML += totalStats[4]
  document.getElementById("pokeSpeed").innerHTML += totalStats[5]
}

function loadTeam() {
  let team = [0, 0, 0, 0, 0, 0]
  for (let i = 0; i < team.length; i++) {
    team[i] = localStorage.getItem(`team${i + 1}`);
  }
  return team
}

async function GetPokemon(id) {
  try {
    let pokeDataRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokeData = await pokeDataRaw.json();
    
    console.log(pokeData)
    return pokeData

  } catch (error) {
    console.error(error.message)
  }
}