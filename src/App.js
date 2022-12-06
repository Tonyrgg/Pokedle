import { useState, useEffect } from "react";
import _ from "lodash";
import "./app.css";

function App() {
  const [count, setCount] = useState(0)
  const [numero, setNumero] = useState()
  const [guessPokemon, setGuessPokemon] = useState({})
  const [pokemon, setPokemon] = useState({})
  const [input, setInput] = useState()
  const [loading, setLoading] = useState(false);

async function fetchPokemon() {
    let pokemonfetch = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const res = await pokemonfetch.json()
    setCount(res.count);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 100);  
    setNumero(Random());
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
      fetchPokemon()
      catchPokemon()
}, [loading])

function Random() {
  var maxNumber =  count;
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return randomNumber
}

async function catchPokemon() {
let sprite = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
    const res = await sprite.json()
    console.log(res);
    setGuessPokemon({
      abilitauno: res.abilities[0].ability.name,
      abilitadue: res.abilities[1]?.ability.name,
      sprite: res.sprites.front_default,
      tipo1: res.types[0].type.name,
      tipo2: res.types[1]?.type.name,
    })
}

async function handleSubmit(event) {
  event.preventDefault();

  let sprite = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    const res = await sprite.json()
    setPokemon({
      abilitauno: res.abilities[0].ability.name,
      abilitadue: res.abilities[1]?.ability.name,
      sprite: res.sprites.front_default,
      tipo1: res.types[0].type.name,
      tipo2: res.types[1]?.type.name,
    })

    setInput(event.target.reset())
}

function HandleCompare(x, guessX) {

  if(x == null) {
    return
  } else if(x == guessX) {
    return <h2>Uguali</h2>
  } else {
    return <h2>Diversi</h2>
  }
}


return (  
    <div className="w-full flex flex-col h-full big-box">
      <div className="logo-box mt-4">
      </div>
      <div>
      <img className="w-20 h-24" src={pokemon.sprite} />
      <form onSubmit={handleSubmit}>
      <input type="text" onChange={event => setInput(event.target.value)}/>
      <button type="submit">invia</button>
      </form>
      </div>
      { pokemon && HandleCompare(pokemon.abilitauno, guessPokemon.abilitauno) }
      { pokemon && HandleCompare(pokemon.abilitadue, guessPokemon.abilitadue) }
      { pokemon && HandleCompare(pokemon.tipo1, guessPokemon.tipo1) }
      { pokemon && HandleCompare(pokemon.tipo2, guessPokemon.tipo2) }
    </div>
  ); 
}

export default App;
