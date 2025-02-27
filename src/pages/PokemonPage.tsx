/*

Build a component that displays a list of Pokemons with a "Load more" button. You can use the free Poke API to retrieve the data.

1. Initially, the component should only show the first 5 items
2. Below the list, there should be a label saying how many items are being displayed from the total - e.g. "Displaying 20 of 567 results"
3. Clicking "Load more" will load another 5 items into the list
4. When the are no more results, the button should no longer be displayed

The styling doesn't matter for this component - just make sure to display the pokemons as <li> elements in a list - <ul> - and show the name for each:

*/

import { FC, useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';

const pokeAPIURL = "https://pokeapi.co/api/v2/pokemon?limit=5";

type Pokemon = {
    name: string;
    url: string;
}

type PokemonResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export const PokemonPage: FC = () => {
    const [offset, setOffset] = useState<number>(0);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        // Fetch the first 5 pokemons
        async function fetchPokemons() {
            const response = await fetch(pokeAPIURL);
            const data: PokemonResponse = await response.json();
            setPokemons(data.results);
            setTotal(data.count);
            setOffset(5);
        }
        fetchPokemons();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Pokemon list</h1>
                    <div className="flex flex-col">
                        <ul className="list-disc list-inside">
                            {pokemons.map((pokemon: Pokemon) => (
                                <li key={pokemon.name}>{pokemon.name}</li>
                            ))}
                        </ul>
                        <p className="text-gray-600 text-sm mt-4">Displaying {offset} of {total} results</p>
                        <button
                            className="bg-blue-500 text-white rounded p-2 mt-4"
                            onClick={async () => {
                                const response = await fetch(`${pokeAPIURL}&offset=${offset}`);
                                const data: PokemonResponse = await response.json();
                                setPokemons((prev) => [...prev, ...data.results]);
                                setOffset((prev) => prev + 5);
                            }}
                            disabled={offset >= total}
                        >
                            Load more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
