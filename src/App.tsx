import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchPokemonByName } from "./api/pokemon";
import type { PokemonData } from "./types/pokemon.types";
import { toast, Toaster } from "sonner";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.error("Empty Search", {
        description: "Please enter a Pokémon name.",
        style: {
          backgroundColor: "#fee2e2",
          borderColor: "#f87171",
          borderWidth: "2px",
          color: "#b91c1c",
        },
        classNames: {
          icon: "text-red-700",
        },
      });

      return;
    }

    setData(null);
    setLoading(true);

    try {
      const result = await fetchPokemonByName(search);
      console.log(result);
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Not Found", {
        description: "Pokemon not found. Please check the spelling.",
        style: {
          backgroundColor: "#fee2e2",
          borderColor: "#f87171",
          borderWidth: "2px",
          color: "#b91c1c",
        },
        classNames: {
          title: "font-black text-xl tracking-tight font-sans",
          description: "text-red-600 font-semibold font-sans",
          icon: "text-red-700",
        },
      });
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
      <div className="min-h-dvh h-full w-full bg-slate-700 flex flex-col justify-start pb-20">
        <h1 className="text-xl sm:text-5xl font-bold text-center text-neutral-100 mt-10 sm:mt-20 mb-10 px-4 font-retro tracking-widest leading-tight">
          Welcome to <br className="sm:hidden" /> PokeSearch
        </h1>

        <div className="w-full px-4 py-6 sm:py-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        <h2 className="text-neutral-100 text-xl sm:text-2xl font-semibold font-retro tracking-widest text-center mb-6 sm:mb-10 px-4">
          Search Result
        </h2>

        <div className="px-4">{data && <PokemonCard pokemon={data} />}</div>
      </div>

      <Toaster position="bottom-center" richColors duration={3000} />
    </>
  );
}

export default App;
