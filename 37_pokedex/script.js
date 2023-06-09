const pokemonCard = document.getElementById("poke-container")
const pokemonCount = 150
const colorsType = {
	fire: "#FDDFDF",
	grass: "#DEFDE0",
	electric: "#FCF7DE",
	water: "#DEF3FD",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "#98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5",
}

/*Combinar color de tipos: https://www.campusmvp.es/recursos/post/mezclando-colores-y-creando-efectos-fotograficos-en-css-mediante-el-uso-de-blend-modes.aspx*/

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemonCount; i++) {
		await getPokemon(i)
	}
}

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const res = await fetch(url)
	const data = await res.json()
	console.log(data)
}

fetchPokemons()
