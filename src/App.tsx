import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { fetchPokemonByName } from "./api/pokemon";
import type { PokemonData } from "./types/pokemon.types";

function App() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // The boolean is inferred, but good practice to explicitly type it while learning

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a Pokémon name.");
      return;
    }

    setError(null);
    setData(null);
    setLoading(true);

    try {
      const result = await fetchPokemonByName(search);
      console.log(result);
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Pokemon not found. Please check the spelling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>PokeSearch</title>
      <link
        rel="icon"
        href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/960px-Pok%C3%A9_Ball_icon.svg.png"
        sizes="32x32"
        type="image/png"
      />
      <div className="min-h-dvh w-full bg-slate-700 flex flex-col justify-start">
        <h1 className=" text-5xl font-bold text-center text-neutral-100 m-25 font-retro tracking-widest">
          Welcome to PokeSearch
        </h1>
        <div className="w-full py-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
        <h2 className="text-neutral-100 text-2xl font-semibold font-retro tracking-widest text-center">
          Pokemon List
        </h2>
        {error && (
          <div className="fixed bottom-10 right-10 z-50 max-w-sm bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl font-bold font-sans transition-all duration-300 ease-in-out border border-red-800">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
