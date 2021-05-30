

const POKEMON_API_1 = 18;
const evitarEvoluciones = 3;
let pokemonContainerCounter = 1;

let dataPokemones = [];

for(let i = 1; i <= POKEMON_API_1; i+= evitarEvoluciones) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(response => response.json())
    .then(responseJSON => {

        addPokemon(responseJSON, i, pokemonContainerCounter)        
        dataPokemones.push(responseJSON)
        pokemonContainerCounter += 1;
        
        
    })
    .catch(error => console.error(error))
}

function addPokemon(pokemon, indexPokemon, indexContainerPokemon) {
        $(".main-container").append($(`<div id="${pokemon.name}-container"class="pokemon-container ${indexContainerPokemon}"><p class="name-pokemon">${pokemon.name}</p></div>`));
        $(`#${pokemon.name}-container`).append($(`<div class="${pokemon.name} img-container"><img class="${pokemon.name} img-pokemon" id="pokemon-${indexPokemon}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexPokemon}.png"></div>`));
        $(`#${pokemon.name}-container`).append($(`<div class="${pokemon.name} btn-container"><button id="btn-pokemon" class="${pokemon.name} btn-pokemon">Ver Detalle</button></div>`))
        
}

function mostrarDetalles (event) {
    $(".pokemon-stats").removeClass("oculto")
    let pokemonSeleccionado = event.target.classList[0]
    let imgPokemonSeleccionado = document.querySelector(`.${pokemonSeleccionado} .img-pokemon`);
    for (let i = 0; i < dataPokemones.length; i++) {
        if(dataPokemones[i].name === pokemonSeleccionado) {
            $(".mini-img-pokemon").append(imgPokemonSeleccionado.cloneNode(true))
            $(".stats-list .name").text(function() {
                console.log(dataPokemones[i])
                return `Nombre: ${dataPokemones[i].name}`
            })
            $(".stats-list .type").text(function() {
                return `Tipo: ${dataPokemones[i].types[0].type.name}`
            })
            $(".stats-list .tall").text(function() {
                return `Altura: ${dataPokemones[i].height * 10} cm`
            })
            $(".stats-list .weight").text(function() {
                return `Peso: ${dataPokemones[i].weight} kg`
            })

        }
    }
}

function salirDetalles (event) {
    $(".pokemon-stats").addClass("oculto");
    $(".mini-img-pokemon").html("")
    $(".stats-list .name").html("")
    $(".stats-list .type").html("")
    $(".stats-list .tall").html("")
    $(".stats-list .weight").html("")
}

setTimeout(() => {
    $(".btn-pokemon").click(mostrarDetalles);
    $(".details-exit").click(salirDetalles);
}, 3000)




