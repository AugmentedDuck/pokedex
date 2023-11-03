LoadPokeInfo(sessionStorage.getItem("pokeID"))

async function LoadPokeInfo(id) {
  try {
    let pokeDataRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokeData = await pokeDataRaw.json();
    
    console.log(pokeData)
    BuildInformation(pokeData)
  } catch (error) {
    console.error(error.message)
    document.getElementById("pokeName").innerHTML = "POKEMON NOT FOUND"
  }

}

function GoBack() {
  window.location.href = "index.html"
}

function AddToTeam() {

  let teamIndex = parseInt(sessionStorage.getItem("teamIndex")) || 1;
  let pokeID = parseInt(sessionStorage.getItem("pokeID"));

  localStorage.setItem(`team${teamIndex}`, pokeID);
  console.log("ADDED: " + pokeID + "\nTO: " + teamIndex);

  if (teamIndex == 6) {
    teamIndex = 1;
  } else {
    teamIndex++;
  }
  
  sessionStorage.setItem("teamIndex", teamIndex);
}

function BuildInformation(pokeData) {

  document.getElementById("pokeName").innerHTML = pokeData.name
  document.getElementById("pokeImage").src = pokeData.sprites.front_default;

  document.getElementById("pokeWeight").innerHTML += pokeData.weight
  document.getElementById("pokeHeight").innerHTML += pokeData.height;
  document.getElementById("pokeHP").innerHTML += pokeData.stats[0].base_stat
  document.getElementById("pokeATK").innerHTML += pokeData.stats[1].base_stat
  document.getElementById("pokeDEF").innerHTML += pokeData.stats[2].base_stat
  document.getElementById("pokeSPATK").innerHTML += pokeData.stats[3].base_stat
  document.getElementById("pokeSPDEF").innerHTML += pokeData.stats[4].base_stat
  document.getElementById("pokeSpeed").innerHTML += pokeData.stats[5].base_stat

  document.getElementById("background").classList.add(pokeData.types[0].type.name)
  
  if (pokeData.types.length == 2) {
    document.getElementById("header").classList.add(pokeData.types[1].type.name)
  }
}