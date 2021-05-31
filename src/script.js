const POKEMON_API_1 = 18;
const evitarEvoluciones = 3;
let pokemonContainerCounter = 1;

let nombrePokemones = [];


fetch(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=0`)
    .then(response => response.json())
    .then(responseJSON => {

        //addPokemon(responseJSON, i, pokemonContainerCounter)        
        nombrePokemones.push(responseJSON.results)
        nombrePokemones[0].forEach((nombrePokemon, index, indexContainer = 1) => {
            addPokemon(nombrePokemon, index + 1, indexContainer)
            indexContainer += 1;
        })
        $(".btn-pokemon").click(mostrarDetalles);
        $(".details-exit").click(salirDetalles);
        
    })
    .catch(error => console.error(error))

function addPokemon(pokemon, indexPokemon, indexContainerPokemon) {
        $(".main-container").append($(`<div id="${pokemon.name}-container"class="pokemon-container ${indexContainerPokemon}"><p class="name-pokemon">${pokemon.name}</p></div>`));
        $(`#${pokemon.name}-container`).append($(`<div class="${pokemon.name} img-container"><img class="${pokemon.name} img-pokemon" id="pokemon-${indexPokemon}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexPokemon}.png"></div>`));
        $(`#${pokemon.name}-container`).append($(`<div class="${pokemon.name} btn-container"><button id="btn-pokemon" class="${pokemon.name} ${indexPokemon} btn-pokemon">Ver Detalle</button></div>`))
        
}

function mostrarDetalles (event) {
    
    $(".pokemon-stats").removeClass("oculto")
    let pokemonSeleccionado = event.target.classList[0]
    let pokemonIndex = Number(event.target.classList[1])
    const imgPokemonSeleccionado = document.querySelector(`.${pokemonSeleccionado}.img-pokemon#pokemon-${pokemonIndex}`)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`) 
        .then(response => response.json())
        .then((pokemonAPI) => {
            
            $(".mini-img-pokemon").append(imgPokemonSeleccionado.cloneNode(true))
            $(".stats-list .name").text(function() {
                console.log(pokemonAPI)
                return `Nombre: ${pokemonAPI.name}`
            })
            $(".stats-list .type").text(function() {
                return `Tipo: ${pokemonAPI.types[0].type.name}`
            })
            $(".stats-list .tall").text(function() {
                return `Altura: ${pokemonAPI.height * 10} cm`
            })
            $(".stats-list .weight").text(function() {
                return `Peso: ${pokemonAPI.weight} kg`
            })})
        .catch(error => console.error(error))
        }

function salirDetalles(event) {
    $(".pokemon-stats").addClass("oculto");
    $(".mini-img-pokemon").html("")
    $(".stats-list .name").html("")
    $(".stats-list .type").html("")
    $(".stats-list .tall").html("")
    $(".stats-list .weight").html("")
}

