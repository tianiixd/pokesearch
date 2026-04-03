import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchPokemonByName } from "./api/pokemon";
import type { PokemonData } from "./types/pokemon.types";
import { toast, Toaster } from "sonner";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // The boolean is inferred, but good practice to explicitly type it while learning

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.error("Empty Search", {
        description: "Please enter a Pokémon name.",
        style: {
          backgroundColor: "#fee2e2", // red-100
          borderColor: "#f87171", // red-400
          borderWidth: "2px",
          // ADD THESE TO OVERRIDE THE TEXT COLORS:
          color: "#b91c1c", // red-700 for the title
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
        {/* FIX 2: Reduced the massive 'm-25' (100px). 
          Used 'mt-10 sm:mt-20' so it's tight on mobile but spaced on desktop.
          Changed 'text-5xl' to 'text-3xl sm:text-5xl' for mobile readability.
        */}
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-neutral-100 mt-10 sm:mt-20 mb-10 px-4 font-retro tracking-widest leading-tight">
          Welcome to <br className="sm:hidden" /> PokeSearch
        </h1>

        {/* FIX 3: Added horizontal padding so the search bar doesn't touch the screen edges */}
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

        {/* The Card now has breathing room */}
        <div className="px-4">{data && <PokemonCard pokemon={data} />}</div>
      </div>

      {/* FIX 4: Moved Toaster to bottom-center for mobile UX. 
        It's harder to reach the top-right on a phone.
      */}
      <Toaster position="bottom-center" richColors duration={3000} />
    </>
  );
}

export default App;
